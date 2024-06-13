const { WebPDFLoader } = require('langchain/document_loaders/web/pdf');
const streamToBlob = require('stream-to-blob')

/**
 * 
 * @After(event = { "UPDATE" }, entity = "GenieService.KnowledgeBase")
 * @param {(Object|Object[])} results - For the After phase only: the results of the event processing
 * @param {Object} request - User information, tenant-specific CDS model, headers and query parameters
*/
module.exports = async function (results, request) {
	// Your code here
	const url = request.req.path;
	console.warn("Request URL:" + url);
	if (url.includes("content")) {    /// in case of new upload
		let { GenieService } = this.cds.services;
		let Attachments = GenieService.entities['KnowledgeBase.attachments']
		const document = await SELECT.one
			.from(Attachments.drafts.name)
			.columns([
				"content",
				"mimeType",
				"filename",
				"up__ID"
			]).where({
				ID: request.data.ID
			});

		console.log(`file name : ${document.filename}`);
		const blob = await streamToBlob(document.content);
		const loader = new WebPDFLoader(blob, {
			parsedItemSeparator: "",
		});
		const docs = await loader.load();
		console.log(JSON.stringify(docs ));
	}
}