sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'geineExercise/manageKnowledgeDocuments/test/integration/FirstJourney',
		'geineExercise/manageKnowledgeDocuments/test/integration/pages/KnowledgeBaseList',
		'geineExercise/manageKnowledgeDocuments/test/integration/pages/KnowledgeBaseObjectPage'
    ],
    function(JourneyRunner, opaJourney, KnowledgeBaseList, KnowledgeBaseObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('geineExercise/manageKnowledgeDocuments') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheKnowledgeBaseList: KnowledgeBaseList,
					onTheKnowledgeBaseObjectPage: KnowledgeBaseObjectPage
                }
            },
            opaJourney.run
        );
    }
);