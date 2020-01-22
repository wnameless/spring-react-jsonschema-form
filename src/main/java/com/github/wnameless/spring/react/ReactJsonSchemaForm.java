/*
 *
 * Copyright 2019 Wei-Ming Wu
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

import java.util.HashMap;
import java.util.Map;

import com.fasterxml.jackson.databind.JsonNode;

public interface ReactJsonSchemaForm {

  JsonNode getFormData();

  void setFormData(JsonNode formData);

  JsonNode getSchema();

  void setSchema(JsonNode schema);

  JsonNode getUiSchema();

  void setUiSchema(JsonNode uiSchema);

  default Map<String, JsonNode> toRjsfMap() {
    Map<String, JsonNode> map = new HashMap<>();

    map.put("formData", getFormData());
    map.put("schema", getSchema());
    map.put("uiSchema", getUiSchema());

    return map;
  }

}
