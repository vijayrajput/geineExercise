/**
 * Code is auto-generated by Application Logic, DO NOT EDIT.
 * @version(2.0)
 */
const LCAPApplicationService = require('@sap/low-code-event-handler');
const add_Knowledgebase_Logic = require('./code/add-knowledgebase-logic');

class GenieService extends LCAPApplicationService {
    async init() {

        this.after('UPDATE', 'KnowledgeBase.attachments.drafts', async (results, request) => {
            await add_Knowledgebase_Logic(results, request);
        });

        return super.init();
    }
}


module.exports = {
    GenieService
};