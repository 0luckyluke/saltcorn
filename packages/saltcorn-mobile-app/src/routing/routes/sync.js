/*global saltcorn */

import { MobileRequest } from "../mocks/request";
import { wrapContents } from "../utils";

// get/sync/sync_settings
export const getSyncSettingsView = async (context) => {
  const state = saltcorn.data.state.getState();
  const { isOfflineMode } = state.mobileConfig;
  const content = saltcorn.markup.div(
    { class: "container" },
    saltcorn.markup.div(
      { class: "row" },
      saltcorn.markup.div(
        { class: "col-9" },
        saltcorn.markup.div(
          { class: "fs-6 fw-bold text-decoration-underline" },
          "Mode"
        ),
        saltcorn.markup.div(
          {
            id: "onlineDescId",
            class: isOfflineMode ? "d-none" : "d-block",
          },
          "You are online. The data comes from the server."
        ),
        saltcorn.markup.div(
          {
            id: "offlineDescId",
            class: isOfflineMode ? "d-block" : "d-none",
          },
          "You are offline. The data comes from your device."
        )
      ),
      saltcorn.markup.div(
        { class: "col-3" },
        saltcorn.markup.div(
          {
            class: "form-check form-switch",
            style: "transform: scale(1.38); margin-left: 10px;",
          },
          saltcorn.markup.input({
            class: "form-check-input",
            type: "checkbox",
            role: "switch",
            id: "networkModeSwitcherId",
            checked: !isOfflineMode,
            onClick: "switchNetworkMode()",
          })
        )
      )
    ),
    saltcorn.markup.hr(),
    saltcorn.markup.div(
      { class: "row" },
      saltcorn.markup.div(
        { class: "col-9" },
        saltcorn.markup.div(
          { class: "fs-6 fw-bold text-decoration-underline" },
          "Sync offline data"
        ),
        saltcorn.markup.div("Upload the data from your last offline session.")
      ),
      saltcorn.markup.div(
        { class: "col-3" },
        saltcorn.markup.button(
          {
            class: "btn btn-primary",
            type: "button",
            onClick: "callSync()",
          },
          saltcorn.markup.i({ class: "fas fa-sync" })
        )
      )
    ),
    saltcorn.markup.hr(),
    saltcorn.markup.div(
      { class: "row" },
      saltcorn.markup.div(
        { class: "col-9" },
        saltcorn.markup.div(
          { class: "fs-6 fw-bold text-decoration-underline" },
          "Delete offline data"
        ),
        saltcorn.markup.div("Delete all offline data.")
      ),
      saltcorn.markup.div(
        { class: "col-3" },
        saltcorn.markup.button(
          {
            class: "btn btn-primary",
            type: "button",
            onClick: "deleteOfflineDataClicked()",
          },
          saltcorn.markup.i({ class: "fas fa-trash" })
        )
      )
    ),
    saltcorn.markup.hr()
  );
  return await wrapContents(
    content,
    "Sync Settings",
    context,
    new MobileRequest()
  );
};

// get/sync/ask_upload_not_ended
export const getAskUploadNotEnded = async (context) => {
  const content = saltcorn.markup.div(
    saltcorn.markup.div(
      { class: "mb-3 h6" },
      "A previous upload did not finish." +
        "Please check if your data is already online."
    ),
    saltcorn.markup.button(
      {
        class: "btn btn-secondary me-2",
        type: "button",
        "data-bs-dismiss": "modal",
      },
      "Close"
    ),
    saltcorn.markup.button(
      {
        class: "btn btn-primary close",
        type: "button",
        onClick: "closeModal(); callUpload(true)",
      },
      "Upload anyway"
    )
  );
  return await wrapContents(content, "Warning", context, new MobileRequest());
};

// get/sync/ask_delete_offline_data
export const getAskDeleteOfflineData = async (context) => {
  const content = saltcorn.markup.div(
    saltcorn.markup.div(
      { class: "mb-3 h6" },
      "Do you really want to delete all offline data from your device?"
    ),
    saltcorn.markup.button(
      {
        class: "btn btn-secondary me-2",
        type: "button",
        "data-bs-dismiss": "modal",
      },
      "Close"
    ),
    saltcorn.markup.button(
      {
        class: "btn btn-primary close",
        type: "button",
        onClick:
          "closeModal(); parent.saltcorn.mobileApp.offlineMode.deleteOfflineData()",
      },
      "Delete"
    )
  );
  return await wrapContents(content, "Warning", context, new MobileRequest());
};
