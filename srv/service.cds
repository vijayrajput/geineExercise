using { sap.emea.btp.geine as my } from '../db/schema';

@path : '/service/geineExerciseSvcs'
service GenieService
{
    entity DocumentChunk as
        projection on my.DocumentChunk;

    @odata.draft.enabled
    entity KnowledgeBase as projection on my.KnowledgeBase
    {
        *
    }
    excluding
    {
        createdAt,
        createdBy,
        modifiedAt,
        modifiedBy
    };
}

annotate GenieService with @requires :
[
    'authenticated-user'
];
