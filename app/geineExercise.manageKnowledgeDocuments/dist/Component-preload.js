//@ui5-bundle geineExercise/manageKnowledgeDocuments/Component-preload.js
sap.ui.require.preload({
	"geineExercise/manageKnowledgeDocuments/Component.js":function(){
sap.ui.define(["sap/fe/core/AppComponent"],function(e){"use strict";return e.extend("geineExercise.manageKnowledgeDocuments.Component",{metadata:{manifest:"json"}})});
},
	"geineExercise/manageKnowledgeDocuments/i18n/i18n.properties":'# This is the resource bundle for geineExercise.manageKnowledgeDocuments\n\n#Texts for manifest.json\n\n#XTIT: Application name\nappTitle=manageKnowledgeDocuments\n\n#YDES: Application description\nappDescription=My SAP application\n\n#XFLD,72\nflpTitle=manageKnowledgeDocuments\n',
	"geineExercise/manageKnowledgeDocuments/manifest.json":'{"_version":"1.48.0","sap.app":{"id":"geineExercise.manageKnowledgeDocuments","type":"application","i18n":"i18n/i18n.properties","applicationVersion":{"version":"0.0.1"},"title":"{{appTitle}}","description":"{{appDescription}}","resources":"resources.json","sourceTemplate":{"id":"@sap/generator-fiori:lrop","version":"1.13.6","toolsId":"f4fa7946-0c9d-4f84-8936-c20a1141f46c"},"dataSources":{"mainService":{"uri":"service/geineExerciseSvcs/","type":"OData","settings":{"annotations":[],"odataVersion":"4.0"}}},"crossNavigation":{"inbounds":{"geineExercisemanageKnowledgeDo-display":{"semanticObject":"geineExercisemanageKnowledgeDo","action":"display","title":"{{flpTitle}}","signature":{"parameters":{},"additionalParameters":"allowed"}}}}},"sap.ui":{"technology":"UI5","icons":{"icon":"","favIcon":"","phone":"","phone@2":"","tablet":"","tablet@2":""},"deviceTypes":{"desktop":true,"tablet":true,"phone":true}},"sap.ui5":{"flexEnabled":true,"dependencies":{"minUI5Version":"1.121.1","libs":{"sap.m":{},"sap.ui.core":{},"sap.ushell":{},"sap.fe.templates":{}}},"contentDensities":{"compact":true,"cozy":true},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","settings":{"bundleName":"geineExercise.manageKnowledgeDocuments.i18n.i18n"}},"":{"dataSource":"mainService","preload":true,"settings":{"synchronizationMode":"None","operationMode":"Server","autoExpandSelect":true,"earlyRequests":true}},"@i18n":{"type":"sap.ui.model.resource.ResourceModel","uri":"i18n/i18n.properties"}},"resources":{"css":[]},"routing":{"config":{},"routes":[{"pattern":":?query:","name":"KnowledgeBaseList","target":"KnowledgeBaseList"},{"pattern":"KnowledgeBase({key}):?query:","name":"KnowledgeBaseObjectPage","target":"KnowledgeBaseObjectPage"}],"targets":{"KnowledgeBaseList":{"type":"Component","id":"KnowledgeBaseList","name":"sap.fe.templates.ListReport","options":{"settings":{"contextPath":"/KnowledgeBase","variantManagement":"Page","navigation":{"KnowledgeBase":{"detail":{"route":"KnowledgeBaseObjectPage"}}},"controlConfiguration":{"@com.sap.vocabularies.UI.v1.LineItem":{"tableSettings":{"type":"ResponsiveTable"}}}}}},"KnowledgeBaseObjectPage":{"type":"Component","id":"KnowledgeBaseObjectPage","name":"sap.fe.templates.ObjectPage","options":{"settings":{"editableHeaderContent":false,"contextPath":"/KnowledgeBase"}}}}}},"sap.fiori":{"registrationIds":[],"archeType":"transactional"},"sap.cloud":{"public":true,"service":"lcap.geineExercise"}}'
});
//# sourceMappingURL=Component-preload.js.map
