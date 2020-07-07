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

package com.google.sps.servlets;

import com.google.gson.Gson;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/** Servlet that returns messages/ comments. */
@WebServlet("/data")
public class DataServlet extends HttpServlet {
  private List<String> messages;

  @Override
  public void init() {
    messages = new ArrayList<>();
    messages.add("Green tea was founded in China in 2737 B.C.");
    messages.add("English Breakfast Tea came into existence in 1843");
    messages.add("Chai tea was invented between 5000 and 9000 years ago");
  }

  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    String json = convertToJson(messages);

    response.setContentType("application/json;");
    response.getWriter().println(json);
  }

  /**
   * Converts the messages list instance into a JSON string using the Gson library. 
   */
  private String convertToJson(List<String> messages) {
    Gson gson = new Gson();
    String json = gson.toJson(messages);
    return json;
  }
}
