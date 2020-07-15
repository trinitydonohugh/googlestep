// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps;

import java.util.Collection;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.HashSet;
import java.util.Set;


public final class FindMeetingQuery {
  /**
   * Handles "find a meeting" feature by using the exsisting API to return the times
   * when the meeting could happen that day, given the meeting information.
   *
   * @param events all events happening on a given day including event name, 
   *                a TimeRange, and collection of attendees.
   *
   * @param request details of meeting being requested including requested meeting name, 
   *                duration, and collection of attendees.
   *
   * @return an ArrayList containing all the TimeRanges the request meeting can be scheduled
   *
   */
  public Collection<TimeRange> query(Collection<Event> events, MeetingRequest request) {
    long duration = request.getDuration();

    if (duration > TimeRange.WHOLE_DAY.duration()) {
      return Arrays.asList();
    } else if (events.isEmpty()) {
      return Arrays.asList(TimeRange.WHOLE_DAY);
    }

    List<String> attendees = new ArrayList<String>(request.getAttendees());
    List<TimeRange> busyTimeRanges = findBusyTimes(events, attendees);

    if (!request.getOptionalAttendees().isEmpty()) {
      List<String> optional = new ArrayList<String>(request.getOptionalAttendees());
      attendees.addAll(optional);

      List<TimeRange> optionalBusyTimeRanges = findBusyTimes(events, attendees);
      List<TimeRange> optionalMeetingTimes = findMeetingTimes(optionalBusyTimeRanges, duration);

      if(!optionalMeetingTimes.isEmpty()) {
        return optionalMeetingTimes;
      } else {
        return Arrays.asList();
      }

    }

    return findMeetingTimes(busyTimeRanges, duration);
  }

  //finds meeting times that don't fall during busy times of the day
  private List<TimeRange> findMeetingTimes(List<TimeRange> busyTimeRanges, long duration) {
    if (busyTimeRanges.isEmpty()) {
      return Arrays.asList(TimeRange.WHOLE_DAY);
    }

    Collections.sort(busyTimeRanges, TimeRange.ORDER_BY_START);

    List<TimeRange> busyTimeMerged = mergeBusyTimes(busyTimeRanges);
    List<TimeRange> sortByEndTime = sortByEnd(busyTimeMerged);

    return findFreeTimes(busyTimeMerged, sortByEndTime, duration);
  }

  //merges all the overlapping busy times for all event attendees to create larger time interval, if possible
  private List<TimeRange> mergeBusyTimes(List<TimeRange> busyTimeRanges) {
    List<TimeRange> merged = new ArrayList<TimeRange>();

    int numRange = busyTimeRanges.size();
    if (numRange == 1) { //only one busy time range, no need to merge
      return busyTimeRanges;
    }
 
    int currRangeIndex = 0;
    int nextRangeIndex = 1;
    int start = busyTimeRanges.get(0).start();
    int end = busyTimeRanges.get(0).end();

    while (currRangeIndex < numRange && nextRangeIndex < numRange) {
      TimeRange currRange = busyTimeRanges.get(currRangeIndex);
      TimeRange nextRange = busyTimeRanges.get(nextRangeIndex);

      if (currRange.contains(nextRange)) {
        nextRangeIndex++;
      } else if (currRange.overlaps(nextRange)) {
        end = busyTimeRanges.get(nextRangeIndex).end();
        currRangeIndex = nextRangeIndex;
        nextRangeIndex = currRangeIndex + 1;
      } else {
        merged.add(TimeRange.fromStartEnd(start, end, false));
        currRangeIndex = nextRangeIndex;
        start = busyTimeRanges.get(currRangeIndex).start();
        end = busyTimeRanges.get(currRangeIndex).end();
        nextRangeIndex = currRangeIndex + 1;
      }
    }

    merged.add(TimeRange.fromStartEnd(start, end, false));

    return merged;
  }

  //sorts all merged busy times by end time
  private List<TimeRange> sortByEnd(List<TimeRange> busyTimeMerged) {
    List<TimeRange> sorted = new ArrayList<TimeRange>(busyTimeMerged);
    Collections.sort(sorted, TimeRange.ORDER_BY_END);
    return sorted;
  }

  private ArrayList<TimeRange> findBusyTimes(Collection<Event> events, List<String> attendees) {
    ArrayList<TimeRange> busy = new ArrayList<TimeRange>();

    for (Event event: events) {
      boolean relevantEvent = false;
      for (String eventAttendee : event.getAttendees()) {
        if(attendees.contains(eventAttendee)) {
          relevantEvent = true;
          busy.add(event.getWhen());
          break;
        }
      }
    }

    return busy;
  }

  //finds all free times the meeting can occur
  private List<TimeRange> findFreeTimes(List<TimeRange> busyTimeRanges, List<TimeRange> sortByEndTime, long duration) {
    List<TimeRange> freeTimes = new ArrayList<TimeRange>();

    int startIndex = 0;
    int endIndex = 0;

    int numBusyRanges = busyTimeRanges.size();

    //free time between start of day and first busy time
    TimeRange freeTime = TimeRange.fromStartEnd(TimeRange.START_OF_DAY, busyTimeRanges.get(endIndex).start(), false);
    if (freeTime.duration() >= duration) {
      freeTimes.add(freeTime);
    }
    endIndex++;

    while (startIndex < numBusyRanges && endIndex < numBusyRanges) {
      int start = busyTimeRanges.get(startIndex).end();
      int end = busyTimeRanges.get(endIndex).start();

      if (start > end) {
        endIndex++;
      } else if (start == end) {
        startIndex++;
        endIndex++;
      } else {
        freeTime = TimeRange.fromStartEnd(start, end, false);
        if (freeTime.duration() >= duration) {
          freeTimes.add(freeTime);
        }
        startIndex++;
        endIndex++;
      }
    }

    //free time between end of day and last busy time
    freeTime = TimeRange.fromStartEnd(sortByEndTime.get(numBusyRanges-1).end(), TimeRange.END_OF_DAY, true);
    if (freeTime.duration() >= duration) {
      freeTimes.add(freeTime);
    }

    return freeTimes;
  }
}
