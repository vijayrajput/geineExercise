const { WebPDFLoader } = require('langchain/document_loaders/web/pdf');
const streamToBlob = require('stream-to-blob')


// Helper method to convert embeddings to buffer for insertion
let array2VectorBuffer = (data) => {
    const sizeFloat = 4
    const sizeDimensions = 4
    const bufferSize = data.length * sizeFloat + sizeDimensions
  
    const buffer = Buffer.allocUnsafe(bufferSize)
    // write size into buffer
    buffer.writeUInt32LE(data.length, 0)
    data.forEach((value, index) => {
      buffer.writeFloatLE(value, index * sizeFloat + sizeDimensions);
    })
    return buffer
  }
/**
 * 
 * @After(event = { "UPDATE" }, entity = "GenieService.KnowledgeBase")
 * @param {(Object|Object[])} results - For the After phase only: the results of the event processing
 * @param {Object} request - User information, tenant-specific CDS model, headers and query parameters
*/
module.exports = async function (results, request) {
	// Your code here
	const url = request.req.path;
	console.info("Request Data:" + request.data.mimeType);
	if(request.data.mimeType != 'application/pdf')
		{
			request.error({
				code: '400',
				message: `Only PDF document is supported`
			});
			return;
		}
	
	if (url.includes("content")) {    /// in case of new upload
		let { GenieService } = this.cds.services;
		let textChunkEntries = []
		const { DocumentChunk } = GenieService.entities;
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
		const vectorPlugin = await cds.connect.to('cap-llm-plugin');
		for (const page of docs) {
			const embedding = await vectorPlugin.getEmbedding(page.pageContent)
			const entry = {
			  "textChunk": page.pageContent,
			  "fileReference": document.up__ID,
			  "embedding": array2VectorBuffer(embedding)
			}
			textChunkEntries.push(entry)
		  }
		  const insertStatus = await INSERT.into(DocumentChunk).entries(textChunkEntries)
		  console.log(`record inserted : ${insertStatus}`);

	}
}