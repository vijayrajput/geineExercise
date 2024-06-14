sap.ui.define(
    [
        'sap/fe/core/PageController'
    ],
    function(PageController) {
        'use strict';

        return PageController.extend('geineExercise.chatUI.ext.main.Main', {
            /**
             * Called when a controller is instantiated and its View controls (if available) are already created.
             * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
             * @memberOf geineExercise.chatUI.ext.main.Main
             */
              onInit: function () {
                this.getView().setModel(new sap.ui.model.json.JSONModel({
                }), "chatModel");

                this.getView().setModel(new sap.ui.model.json.JSONModel({
                }), "historyModel");
                this.getView().getModel("historyModel").setProperty("/history", []);

                this._oBusyDialog = new sap.m.BusyDialog("busyDialog", {
                    text: "The Genie is thinking..."
                });

                 //add event for enter
                 this.iDebounceTimer = null;
                 var oInput = this.getView().byId("newMessageInput");
                 if (oInput) {
                     oInput.attachBrowserEvent("keypress", function (oEvent) {
                         if (oEvent.key === "Enter" && !oEvent.shiftKey) {
                             clearTimeout(this.iDebounceTimer);
                             this.iDebounceTimer = setTimeout(() => {
                                 this.onPostMessage();
                             }, 300); // Trigger submission after 300 ms of no additional keypress
                             oEvent.preventDefault(); // Prevent the default Enter key behavior
                         }
                     }.bind(this));
                 }
              },

            /**
             * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
             * (NOT before the first rendering! onInit() is used for that one!).
             * @memberOf geineExercise.chatUI.ext.main.Main
             */
            //  onBeforeRendering: function() {
            //
            //  },

            /**
             * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
             * This hook is the same one that SAPUI5 controls get after being rendered.
             * @memberOf geineExercise.chatUI.ext.main.Main
             */
            //  onAfterRendering: function() {
            //
            //  },

            /**
             * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
             * @memberOf geineExercise.chatUI.ext.main.Main
             */
            //  onExit: function() {
            //
            //  }
            onPostMessage: function (oEvent) {
                var that = this;
                var oChatModel = this.getView().getModel("chatModel");
                var oHistoryModel = this.getView().getModel("historyModel");
                var oInput = oChatModel.getProperty("/userInput");
                var oFeedList = this.getView().byId("feedList");

                // Create the user question as a CustomListItem
                var oUserQuestion = new sap.m.CustomListItem({
                    content: [
                        new sap.m.FeedListItem({
                            text: oInput,
                            sender: "You",
                            showIcon: false,
                            timestamp: that.getFormattedTime(),
                            customData: [
                                new sap.ui.core.CustomData({
                                    key: "alignment",
                                    value: "right"
                                })
                            ]
                        }).addStyleClass("userMessage")
                    ]
                });

                // Add question to the feed list
                oFeedList.addItem(oUserQuestion);

                this._oBusyDialog.open();

                // Use the getBotResponse function and wait for the response
                this.getBotResponse(oInput).then(function (sBotResponse) {
                    var oBotResponse = new sap.m.FeedListItem({
                        text: sBotResponse,
                        sender: "Genie",
                        icon: "./utils/genie.ico",
                        iconDensityAware: false,
                        timestamp: that.getFormattedTime(),
                        highlight: "Information",
                        lessLabel: "show less",
                        moreLabel: "show more",
                        customData: [
                            new sap.ui.core.CustomData({
                                key: "alignment",
                                value: "left"
                            })
                        ]
                    }).addStyleClass("botMessage");

                    // Add the bot's response to the feed list
                    oFeedList.addItem(oBotResponse);

                    //get records for history
                    let oHistoryEntryUser = {"content" : oInput, "role": "user"}
                    let oHistoryEntryBot = {"content": sBotResponse, "role": "assistant"}

                    let newHistory = oHistoryModel.getProperty("/history");
                    newHistory.push(oHistoryEntryUser);
                    newHistory.push(oHistoryEntryBot);

                    oHistoryModel.setProperty("/history", newHistory);

                    console.log(oHistoryModel.getProperty("/history"))

                    that._oBusyDialog.close();
                });


                oChatModel.setData({});
            },
            getBotResponse: function (sUserInput) {
                let oModel = this.getView().getModel();
                let oChatModel = this.getView().getModel("chatModel");
                let oHistoryModel = this.getView().getModel("historyModel");

                var oActionODataContextBinding = oModel.bindContext("/chat(...)");
                oActionODataContextBinding.setParameter("question", sUserInput);

                let oHistory = oHistoryModel.getProperty("/history");
                oActionODataContextBinding.setParameter("history", oHistory);

                // Return a Promise that resolves with the bot response
                return new Promise(function (resolve, reject) {
                    oActionODataContextBinding.execute().then(function () {
                        var oActionContext = oActionODataContextBinding.getBoundContext();
                        console.log(oActionContext.getObject().value);
                        resolve(oActionContext.getObject().value);
                    }).catch(function (error) {
                        console.error("Error getting bot response:", error);
                        reject(error);
                    });
                });
            },

            getFormattedTime: function () {
                var now = new Date();
                var hours = now.getHours();
                var minutes = now.getMinutes();
                var ampm = hours >= 12 ? 'pm' : 'am';
                hours = hours % 12;
                hours = hours ? hours : 12; // the hour '0' should be '12'
                minutes = minutes < 10 ? '0' + minutes : minutes;
                var strTime = hours + ':' + minutes + ' ' + ampm;
                return strTime;
            },
        });
    }
);
