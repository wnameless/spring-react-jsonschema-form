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

import com.fasterxml.jackson.databind.JsonNode;
import com.github.wnameless.jpa.type.flattenedjson.FlattenedJsonTypeConfigurer;

public abstract class NoSqlReactJsonSchemaForm implements ReactJsonSchemaForm {

  protected JsonNode formData = FlattenedJsonTypeConfigurer.INSTANCE
      .getObjectMapperFactory().get().createObjectNode();

  protected JsonNode schema = FlattenedJsonTypeConfigurer.INSTANCE
      .getObjectMapperFactory().get().createObjectNode();

  protected JsonNode uiSchema = FlattenedJsonTypeConfigurer.INSTANCE
      .getObjectMapperFactory().get().createObjectNode();

  @Override
  public JsonNode getFormData() {
    return formData;
  }

  @Override
  public void setFormData(JsonNode formData) {
    this.formData = formData;
  }

  @Override
  public JsonNode getSchema() {
    return schema;
  }

  @Override
  public void setSchema(JsonNode schema) {
    this.schema = schema;
  }

  @Override
  public JsonNode getUiSchema() {
    return uiSchema;
  }

  @Override
  public void setUiSchema(JsonNode uiSchema) {
    this.uiSchema = uiSchema;
  }

}
