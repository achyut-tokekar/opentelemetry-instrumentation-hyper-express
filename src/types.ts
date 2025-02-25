/*
 * Copyright The OpenTelemetry Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Span } from '@opentelemetry/api';
import { InstrumentationConfig } from '@opentelemetry/instrumentation';
import type { Request } from 'hyper-express';

export enum LayerType {
  MIDDLEWARE = 'middleware',
  REQUEST = 'request',
}

export interface HyperExpressRequestInfo {
  request: Request; // Request type from @types/restify package
  layerType: LayerType;
}

/**
 * Function that can be used to add custom attributes to the current span
 * @param span - The restify handler span.
 * @param info - The restify request info object.
 */
export interface HyperExpressAttributeFunction {
  (span: Span, info: HyperExpressRequestInfo): void;
}

/**
 * Options available for the restify Instrumentation
 */
export interface HyperExpressInstrumentationConfig extends InstrumentationConfig {
  /** Function for adding custom attributes to each handler span */
  requestHook?: HyperExpressAttributeFunction;
}
