const systemPrompt =
    ` You are an helpful assistant who answers user question based only on the following context enclosed in triple quotes.\n
`;

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
	//Obtain the model configs configured in package.json
        const chatModelConfig = cds.env.requires["gen-ai-hub"]["chat"];
        const embeddingModelConfig = cds.env.requires["gen-ai-hub"]["embedding"];
	    
        const ragResponse = await vectorplugin.getRagResponse(
            question,
            'sap_emea_btp_geine_DocumentChunk',
            'embedding',
            'textChunk',
            systemPrompt,
            embeddingModelConfig,
            chatModelConfig,
            historyContext.length > 0 ? historyContext : undefined,
            3
        )
        return ragResponse.completion.choices[0].message.content


    } catch (error) {
        console.log('Error while generating response for user query:', error)
        throw error;
    }
}
