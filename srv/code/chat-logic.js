/**
 * 
 * @On(event = { "chat" })
 * @param {Object} request - User information, tenant-specific CDS model, headers and query parameters
*/
module.exports = async function (request) {
	// Your code here
    try {
        const question = request.data?.question;
        let historyContext = request.data?.history;
        const vectorplugin = await cds.connect.to('cap-llm-plugin')
        const ragResponse = await vectorplugin.getRagResponse(
            question,
            'sap_emea_btp_geine_DocumentChunk',
            'embedding',
            'textChunk',
            null,
            historyContext
        )
        return ragResponse.completion.content


    } catch (error) {
        console.log('Error while generating response for user query:', error)
        throw error;
    }
}