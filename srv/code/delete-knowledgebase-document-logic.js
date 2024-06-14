/**
 * 
 * @After(event = { "DELETE" }, entity = "GenieService.KnowledgeBase")
 * @param {(Object|Object[])} results - For the After phase only: the results of the event processing
 * @param {Object} request - User information, tenant-specific CDS model, headers and query parameters
*/
module.exports = async function (results, request) {
    const { DocumentChunk } = this.cds.entities
    const contentDelete = await DELETE.from(DocumentChunk).where({fileReference : request.data.ID});
    console.log (`Number of Deleted Content : ${contentDelete}`)
}