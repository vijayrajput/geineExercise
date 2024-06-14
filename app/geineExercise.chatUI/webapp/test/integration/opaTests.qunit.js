sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'geineExercise/chatUI/test/integration/FirstJourney',
		'geineExercise/chatUI/test/integration/pages/DocumentChunkMain'
    ],
    function(JourneyRunner, opaJourney, DocumentChunkMain) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('geineExercise/chatUI') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheDocumentChunkMain: DocumentChunkMain
                }
            },
            opaJourney.run
        );
    }
);