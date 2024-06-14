namespace sap.emea.btp.geine;

using
{
    Country,
    Currency,
    Language,
    User,
    cuid,
    extensible,
    managed,
    temporal
}
from '@sap/cds/common';
using {Attachments} from '@cap-js/attachments';

entity DocumentChunk : cuid
{
    textChunk : LargeString;
    fileReference : String(100);
    embedding: Vector(1536);
}

type History
{
    content : String;
    role : String enum
    {
        user;
        assistant;
    };
}

entity KnowledgeBase : cuid, managed
{
    key ID : UUID;
    note : String(100);
    attachments        : Composition of many Attachments;
}
