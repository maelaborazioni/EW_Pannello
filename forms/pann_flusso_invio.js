/**
 * Lancia l'operazione di predisposizione e consolidamento dei dati per 
 * il successivo invio allo studio
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @protected 
 * 
 * @properties={typeid:24,uuid:"66D615A9-E701-4352-89A5-CA70CE3DC529"}
 */
function preparaChiusuraMesePannello(event)
{
	var params = {
        processFunction: process_chiusura_mese_pannello,
        message: '', 
        opacity: 0.5,
        paneColor: '#434343',
        textColor: '#EC1C24',
        showCancelButton: false,
        cancelButtonText: '',
        dialogName : 'This is the dialog',
        fontType: 'Arial,4,25',
        processArgs: []
    };
	plugins.busy.block(params);
}

/**
 * @properties={typeid:24,uuid:"C644D854-0525-42AB-AE80-9C3AD8D9783F"}
 */
function process_chiusura_mese_pannello()
{
	try
	{
		var frm = forms.pann_header_dtl;
		var grLav = ''; // TODO globals.getGruppoLavoratori()
		var params = globals.inizializzaParametriAttivaMese(frm.idditta,
														    frm.anno * 100 + frm.mese,
														    globals.getGruppoInstallazioneDitta(frm.idditta),
														    grLav,
														    globals._tipoConnessione
	                                                        );
		
		forms.giorn_controllo_cp._daControlliPreliminari = false;
		forms.giorn_controllo_annotazioni_ditta._daControlliPreliminari = false;
		
		globals.chiusuraMeseCliente(params);
	    
	}
	catch(ex)
	{
		var msg = 'Metodo process_chiusura_mese : ' + ex.message;
		globals.ma_utl_showErrorDialog(msg)
		globals.ma_utl_logError(msg,LOGGINGLEVEL.ERROR);
	}
	finally
	{
		plugins.busy.unblock();
	}
}