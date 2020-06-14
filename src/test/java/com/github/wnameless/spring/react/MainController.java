/*
 *
 * Copyright 2020 Wei-Ming Wu
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License. You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License
 * is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing permissions and limitations under
 * the License.
 *
 */
package com.github.wnameless.spring.react;

import java.io.IOException;
import java.net.URL;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.common.base.Charsets;
import com.google.common.io.Resources;

@Controller
public class MainController {

  ObjectMapper mapper = new ObjectMapper();

  @GetMapping("/")
  String index(Model model) throws IOException {
    ReactJsonSchemaForm rjsf = new SimpleReactJsonSchemaForm();

    URL url = Resources.getResource("json-schemas/simple-schema.json");
    String jsonSchema = Resources.toString(url, Charsets.UTF_8);

    rjsf.setSchema(mapper.readTree(jsonSchema));

    model.addAttribute("rjsf", rjsf);
    return "main";
  }

  @PostMapping("/")
  String create(Model model) throws IOException {
    ReactJsonSchemaForm rjsf = new SimpleReactJsonSchemaForm();

    URL url = Resources.getResource("json-schemas/simple-schema.json");
    String jsonSchema = Resources.toString(url, Charsets.UTF_8);

    rjsf.setSchema(mapper.readTree(jsonSchema));

    model.addAttribute("rjsf", rjsf);
    return "form :: new";
  }

}
