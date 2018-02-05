
/**
 * Lancia l'operazione lunga di conteggio delle timbrature
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"D96479F3-504A-4C27-9FCC-E75F5BAF3024"}
 * @AllowToRunInFind
 */
function conteggiaTimbratureMultiploPannello(event)
{
	var frm = forms.pann_header_dtl;
	var dipGiornaliera = globals.getLavoratoriPannello();
	
	globals.showOperazioneMultipla
	(
		  globals.conteggiaTimbrature
		, forms.giorn_operazionemultipla.controller.getName()
		, []
		, []
		, true
		, function(fs)
		  { 
			  fs.addFoundSetFilterParam('idlavoratore','IN',dipGiornaliera);
		  }
		, frm.idditta
		, frm.anno * 100 + frm.mese
		, globals.TipoGiornaliera.NORMALE
		, 'Conteggio timbrature'
	);
}

/**
 * Lancia la compilazione dei giorni secondo la programmazione dei turni impostata od il teorico
 * 
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"60107481-DEB8-41AF-96AF-68933CF61967"}
 * @AllowToRunInFind
 */
function compilaDalAlMultiploPannello(event)
{
	var frm = forms.pann_header_dtl;
	var dipGiornaliera = globals.getLavoratoriPannello();
	
	globals.showOperazioneMultipla
	(
	      globals.ma_utl_hasKey(globals.Key.COMMESSE_COMPILA_GIORNALIERA) ? globals.compilaDalAlCommesse : globals.compilaDalAl
		, forms.giorn_operazionemultipla.controller.getName()
		, []
		, []
		, true
		, function(fs)
		  { 
			  fs.addFoundSetFilterParam('idlavoratore','IN',dipGiornaliera);
		  }
		, frm.idditta
		, frm.anno * 100 + frm.mese
		, null
		, 'Compilazione giorni'
		
	);
}

/**
 * Lancia l'operazione di controlli preliminari per la conversione degli eventi
 * secondo il piano di conversione della ditta
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @private
 *
 * @properties={typeid:24,uuid:"6D74E927-D157-4E96-8037-DAECC100D947"}
 */
function controlliPreliminariDittaPannello(event) 
{
	var params = {
        processFunction: process_controlli_preliminari_pannello,
        message: '', 
        opacity: 0.5,
        paneColor: '#434343',
        textColor: '#EC1C24',
        showCancelButton: false,
        cancelButtonText: '',
        dialogName : '',
        fontType: 'Arial,4,25',
        processArgs: []
    };
	plugins.busy.block(params);
}

/**
 * TODO generated, please specify type and doc for the params
 * @param event
 *
 * @properties={typeid:24,uuid:"E839AEE2-FA08-4C5A-B434-CFC4F31E62FC"}
 */
function process_controlli_preliminari_pannello(event)
{
	try
	{
		var frm = forms.pann_header_dtl;
		var grLav = "";//globals.getGruppoLavoratori();
		var params = globals.inizializzaParametriAttivaMese(frm.idditta,
														    frm.anno * 100 + frm.mese,
														    globals.getGruppoInstallazioneDitta(frm.idditta),
														    grLav,
														    globals._tipoConnessione
	                                                        );
		/** @type {Array} */
		var _arrDipSenzaRegole = grLav != "" ? globals.getElencoDipendentiSenzaRegoleAssociateWS(params) : globals.getElencoDipendentiSenzaRegoleAssociate(params);
		if(_arrDipSenzaRegole && _arrDipSenzaRegole.length > 0)
		{
			plugins.busy.unblock();
			globals.ma_utl_showWarningDialog('Ci sono nuovi dipendenti senza regola associata non presenti in fase di apertura della giornaliera.<br/> \
			Chiudere e riaprire la giornaliera per sistemare le regole e poter proseguire.');
			return;
		}
		
		globals.controlliPreliminari([],
			                         false,
									 frm.idditta,
									 frm.anno,
									 frm.mese,
									 grLav);
	}
	catch(ex)
	{
		var msg = 'Metodo process_controlli_preliminari_pannello : ' + ex.message;
		globals.ma_utl_showErrorDialog(msg)
		globals.ma_utl_logError(msg,LOGGINGLEVEL.ERROR);
	}
	finally
	{
		plugins.busy.unblock();
	}
}
