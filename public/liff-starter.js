window.onload = function() {

    if ( !liff.isInClient() ) window.location = '/404';

    const useNodeJS = true;   // if you are not using a node server, set this value to false
    const defaultLiffId = "";   // change the default LIFF value if you are not using a node server

    // DO NOT CHANGE THIS
    let liffId = "";
    let endpoint = ""

    // if node is used, fetch the environment variable and pass it to the LIFF method
    // otherwise, pass defaultLiffId
    if (useNodeJS) {
        fetch('/send-id')
            .then(function(reqResponse) {
                return reqResponse.json();
            })
            .then(function(jsonResponse) {
                myLiffId = jsonResponse.id;
                endpoint = jsonResponse.blockchainEndpoint;
                initializeLiffOrDie(myLiffId, endpoint);
            })
            .catch(function(error) {
                console.log('There is an error ocurr')
            });
    } else {
        liffId = defaultLiffId;
        initializeLiffOrDie(liffId, endpoint);
    }
};

/**
* Check if myLiffId is null. If null do not initiate liff.
* @param {string} liffId The LIFF ID of the selected element
*/
function initializeLiffOrDie(liffId, endpoint) {
    if (!liffId || !endpoint) {
        console.log('There is no liffId or redirect endpoint')
    } else {
        initializeLiff(liffId, endpoint);
    }
}

/**
* Initialize LIFF
* @param {string} liffId The LIFF ID of the selected element
*/
function initializeLiff(liffId, endpoint) {
    liff
        .init({
            liffId: liffId
        })
        .then(() => {
            if (liff.isInClient()) {
                // start to use LIFF's api
                initializeApp(endpoint);
            }
        })
        .catch((err) => {
            console.log(err)
        });
}

/**
 * Initialize the app by calling functions handling individual app components
 */
function initializeApp(endpoint) {
    liff.getProfile().then(function(profile) {

        var url = endpoint + '?userID=' + profile.userId
                    + '&province=Songkhla';

        const queryString = decodeURIComponent(window.location.search).replace("?liff.state=", "");
        const params = new URLSearchParams(queryString);
        const menu = params.get('menu');
        url += '&menu=' + ((menu != null && menu != '') ? menu: 'covidTracker');
        url += '&userName=' + profile.displayName;
        //Todo : IOS not work
        // liff.closeWindow();
        // liff.openWindow({ url: url });
        console.log(url, encodeURIComponent(url));
        window.location = encodeURIComponent(url);
    }).catch(function(error) {
        //Todo : IOS not work
        // window.alert('Error getting profile: ' + error);
    });
}