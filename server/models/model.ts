import mongoose, { type Model, type Schema } from "mongoose";

/**
 * Registers a model exactly once.
 *
 * Next dev re-evaluates modules on every edit; calling `mongoose.model()` twice
 * for the same name throws OverwriteModelError. Reusing the compiled model from
 * the registry is the standard fix.
 */
export function defineModel<T>(name: string, schema: Schema<T>): Model<T> {
  return (mongoose.models[name] as Model<T>) ?? mongoose.model<T>(name, schema);
}
