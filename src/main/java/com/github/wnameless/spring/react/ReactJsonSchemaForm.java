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
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.wnameless.jpa.type.flattenedjson.FlattenedJsonTypeConfigurer;

public interface ReactJsonSchemaForm<E> {

  E getFormData();

  void setFormData(E formData);

  E getSchema();

  void setSchema(E schema);

  E getUiSchema();

  void setUiSchema(E uiSchema);

  default Map<String, JsonNode> toRjsfMap() {
    Map<String, JsonNode> map = new HashMap<>();

    ObjectMapper mapper =
        FlattenedJsonTypeConfigurer.INSTANCE.getObjectMapperFactory().get();

    if (getFormData() instanceof JsonNode) {
      map.put("formData", (JsonNode) getFormData());
    } else {
      map.put("formData", mapper.valueToTree(getFormData()));
    }
    if (getSchema() instanceof JsonNode) {
      map.put("schema", (JsonNode) getSchema());
    } else {
      map.put("schema", mapper.valueToTree(getSchema()));
    }
    if (getUiSchema() instanceof JsonNode) {
      map.put("uiSchema", (JsonNode) getUiSchema());
    } else {
      map.put("uiSchema", mapper.valueToTree(getUiSchema()));
    }

    return map;
  }

}
