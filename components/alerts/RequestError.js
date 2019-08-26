import ErrorAlert from './ErrorAlert';

function handle(error) {
    let errorDialog;
    if (error.response) {
        errorDialog = new ErrorAlert(`Le serveur a répondu par une erreur ${error.response.status}`);
    } else if (error.request) {
        errorDialog = new ErrorAlert(`Pas de connexion internet`, ErrorAlert.durations.SHORT);
    } else {
        errorDialog = new ErrorAlert(`Erreur : ${error.message}`);
    }
    errorDialog.show();
}

export default { handle };
