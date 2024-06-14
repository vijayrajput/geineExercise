/**
 * 
 * @On(event = { "deleteEmbeddings" })
 * @param {Object} request - User information, tenant-specific CDS model, headers and query parameters
*/
module.exports = async function (request) {
	// Your code here
    try {
        // Delete any previous records in the table
        const { DocumentChunk } = this.cds.entities
        await DELETE.from(DocumentChunk)
        return "Success!"
      }
      catch (error) {
        // Handle any errors that occur during the execution
        console.log('Error while deleting the embeddings content in db:', error)
        throw error
      }
}