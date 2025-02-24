import { PayloadAction } from "@reduxjs/toolkit";

export function isPayloadAction<T>(action: unknown): action is PayloadAction<T> {
    return Boolean(
      action &&
      typeof action === "object" &&
      "type" in action &&
      typeof (action as PayloadAction<T>).type === "string" &&
      "payload" in action
    );
  }
  