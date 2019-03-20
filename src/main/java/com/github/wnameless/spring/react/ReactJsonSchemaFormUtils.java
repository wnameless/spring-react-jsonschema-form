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

import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Map.Entry;

import com.fasterxml.jackson.databind.JsonNode;

public final class ReactJsonSchemaFormUtils {

  private ReactJsonSchemaFormUtils() {}

  public static Map<String, String> propertyTitles(ReactJsonSchemaForm rjsf) {
    Map<String, String> propertyTitles = new LinkedHashMap<>();

    JsonNode schema = rjsf.getSchema();
    JsonNode schemaProperties = schema.get("properties");
    Iterator<Entry<String, JsonNode>> fields = schemaProperties.fields();
    while (fields.hasNext()) {
      Entry<String, JsonNode> f = fields.next();
      propertyTitles.put(f.getKey(), f.getValue().get("title").textValue());
    }

    return propertyTitles;
  }

}
