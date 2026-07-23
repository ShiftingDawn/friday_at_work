import type {BaseIssue, BaseSchema, ErrorMessage, OutputDataset} from "valibot";
import {_addIssue, _getStandardProps} from "valibot";

/**
 * File issue interface.
 */
export interface FileIssue extends BaseIssue<unknown> {
  /**
   * The issue kind.
   */
  readonly kind: "schema";
  /**
   * The issue type.
   */
  readonly type: "file";
  /**
   * The expected property.
   */
  readonly expected: "File";
}

/**
 * File schema interface.
 */
export interface FileSchema<
  TMessage extends ErrorMessage<FileIssue> | undefined
> extends BaseSchema<File, File, FileIssue> {
  /**
   * The schema type.
   */
  readonly type: "file";
  /**
   * The schema reference.
   */
  readonly reference: typeof bunfile;
  /**
   * The expected property.
   */
  readonly expects: "File";
  /**
   * The error message.
   */
  readonly message: TMessage;
}

/**
 * Creates a file schema.
 *
 * @returns A file schema.
 */
export function bunfile(): FileSchema<undefined>;

/**
 * Creates a file schema.
 *
 * @param message The error message.
 *
 * @returns A file schema.
 */
export function bunfile<
  const TMessage extends ErrorMessage<FileIssue> | undefined
>(message: TMessage): FileSchema<TMessage>;

// @__NO_SIDE_EFFECTS__
export function bunfile(
  message?: ErrorMessage<FileIssue>
): FileSchema<ErrorMessage<FileIssue> | undefined> {
  return {
    kind: "schema",
    type: "file",
    reference: bunfile,
    expects: "File",
    async: false,
    message,
    get "~standard"() {
      return _getStandardProps(this);
    },
    "~run"(dataset, config) {
      if (dataset.value instanceof File) {
        // @ts-expect-error copied from valibot
        dataset.typed = true;
      } else if (dataset.value instanceof Blob && Object.hasOwn(dataset.value, "name") && Object.hasOwn(dataset.value, "lastModified")) {
        // @ts-expect-error copied from valibot
        dataset.typed = true;
      } else {
        _addIssue(this, "type", dataset, config);
      }
      // @ts-expect-error copied from valibot
      return dataset as OutputDataset<File, FileIssue>;
    },
  };
}
