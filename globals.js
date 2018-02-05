/**
 * @properties={typeid:24,uuid:"B6DD42E4-DABB-4229-A961-3BE150AA0C3F"}
 */
function selezione_pannello_ditta()
{
	var form = forms.pann_selezione;
	var formName = form.controller.getName();
	
	// settaggio parametro per consentire l'apertura di un nuovo program
	form.bFirstEnter = true;
	
	globals.ma_utl_setStatus(globals.Status.EDIT,formName);
	
	// Prevent the double click on the menu to open two windows
	if(!application.getWindow(formName))
		globals.ma_utl_showFormInDialog(formName, 'Seleziona il periodo');
}

/**
 * @param {Number} idditta
 * @param {Number} anno
 * @param {Number} mese
 * 
 * @properties={typeid:24,uuid:"EB35CEC6-CFA0-4FF1-A6F4-B6C0980F4885"}
 */
function apriProgramPannello(idditta,anno,mese)
{
	var _progName = 'LEAF_Pannello';
	var _progObj = globals.nav.program[_progName];
	_progObj.filter = [];  
    
    var dsFiltri = globals.ottieniDipendentiFiltriAnagrafici(idditta,anno * 100 + mese);
	
    var _ggUltimo = ((globals.TODAY.getMonth() + 1) == mese) ? globals.TODAY.getDate() : globals.getTotGiorniMese(mese,anno); 
	var _parObj = {
		idditta : idditta,
		anno : anno,
		mese : mese,
		selected_tab : 1,
		dal : new Date(anno,mese - 1,1),
		al : new Date(anno,mese - 1,_ggUltimo),
		dipendenti_filtrati : dsFiltri.getMaxRowIndex() > 0 ? dsFiltri.getColumnAsArray(1) : []
	}
	    
    // settaggio parametri iniziali per anomalie timbrature
//    var frmAno = forms.giorn_timbr_mancanti_ditta;
//    frmAno.annoRif = anno;
//    frmAno.meseRif = mese;
//    frmAno.ggRif = _ggUltimo;
//    frmAno.limitaAl = new Date(anno,mese - 1,_ggUltimo);
    
	// settaggio parametri iniziali per squadrature
//	var frmSq = forms.giorn_list_squadrati_ditta;
//	frmSq.annoRif = anno;
//    frmSq.meseRif = mese;
//    frmSq.ggRif = _ggUltimo;
//    frmSq.limitaDal = new Date(anno, mese - 1,1);
//    frmSq.limitaAl = new Date(anno,mese - 1,_ggUltimo);
    
    globals.openProgram(_progName,_parObj,true);
    globals.lookupFoundset(idditta,forms.pann_header_dtl.foundset);
    
}

/**
 * Ottiene il data set con i dipendenti che soddisfano i criteri anagrafici richiesti
 * 
 * @param {Number} idDitta
 * @param {Number} [periodo]
 * 
 * @return {JSDataSet}
 *  
 * @properties={typeid:24,uuid:"CD065CD2-F1D3-497A-8318-A9815BF3D788"}
 */
function ottieniDipendentiFiltriAnagrafici(idDitta,periodo)
{
	var frmFtrAnag = forms.pann_filtri_anagrafici;

	/** @type {String} */
	var sqlFiltri;
	
	if(globals.getTipologiaDitta(idDitta) == globals.Tipologia.ESTERNA)
		sqlFiltri = "SELECT L.idLavoratore AS idDip, P.Nominativo FROM Lavoratori L INNER JOIN Lavoratori_PersoneEsterne P ON L.idLavoratore = P.idLavoratore";
	else
		sqlFiltri = "SELECT L.idLavoratore AS idDip, P.Nominativo FROM Lavoratori L INNER JOIN Persone P ON L.CodiceFiscale = P.CodiceFiscale";
				
	var arrFiltri = [];
 
	// se esistono filtri sulle classificazioni
	if (frmFtrAnag.vFilterRaggruppamento)
	{
		sqlFiltri += (" INNER JOIN Lavoratori_Classificazioni CL ON L.idLavoratore = CL.idLavoratore")
		
		sqlFiltri += (" WHERE CL.CodTipoClassificazione = " + frmFtrAnag.vRaggruppamentoCodice) //frmFtrAnag.vRaggruppamento
			
		if (frmFtrAnag.vFilterRaggruppamento && frmFtrAnag.vRaggruppamentiDettaglio) 
		{
			sqlFiltri += (" AND CL.CodClassificazione IN (" + frmFtrAnag.vRaggruppamentiDettaglio.join() + ")")  //frmFtrAnag.vRaggruppamentoDettaglio
							
			if (frmFtrAnag.vFilterContratto && frmFtrAnag.vContratto)
				sqlFiltri += (" AND L.CodContratto  IN (" + frmFtrAnag.vContratto.join() + ")") //frmFtrAnag.vContratto
							
			if (frmFtrAnag.vFilterQualifica && frmFtrAnag.vQualifica)
				sqlFiltri += (" AND L.CodQualifica  IN ('" + frmFtrAnag.vQualifica.join("','") + "')") //frmFtrAnag.vQualifica
					
			if (frmFtrAnag.vFilterSedeLavoro && frmFtrAnag.vSediLavoro)
				sqlFiltri += (" AND L.idDittaSede  IN (" + frmFtrAnag.vSediLavoro.join() + ")") //frmFtrAnag.vSediLavoro
						
			if (frmFtrAnag.vFilterPosizioneInps && frmFtrAnag.vPosizioniInps)
				sqlFiltri += (" AND L.PosizioneInps  IN (" + frmFtrAnag.vPosizioniInps.join() + ")") //frmFtrAnag.vPosizioniInps
		}
	}
	else
	{
		if (frmFtrAnag.vFilterContratto && frmFtrAnag.vContratto) 
		{
			sqlFiltri += (" WHERE L.CodContratto IN (" + frmFtrAnag.vContratto.join() + ")") //frmFtrAnag.vContratto
						
			if (frmFtrAnag.vFilterQualifica && frmFtrAnag.vQualifica)
				sqlFiltri += (" AND L.CodQualifica IN ('" + frmFtrAnag.vQualifica.join("','") + "')") //frmFtrAnag.vQualifica
			if (frmFtrAnag.vFilterSedeLavoro && frmFtrAnag.vSediLavoro)
				sqlFiltri += (" AND L.idDittaSede IN (" + frmFtrAnag.vSediLavoro.join() + ")") //frmFtrAnag.vSediLavoro
			if (frmFtrAnag.vFilterSedeLavoro && frmFtrAnag.vPosizioniInps)
				sqlFiltri += (" AND L.PosizioneInps IN (" + frmFtrAnag.vPosizioniInps.join() + ")") //frmFtrAnag.vPosizioniInps
			
		}
		else if (frmFtrAnag.vFilterQualifica && frmFtrAnag.vQualifica)
		{
			sqlFiltri += (" WHERE L.CodQualifica IN ('" + frmFtrAnag.vQualifica.join("','") + "')")
							
			if (frmFtrAnag.vFilterSedeLavoro && frmFtrAnag.vFilterSedeLavoro)
				sqlFiltri += (" AND L.idDittaSede IN (" + frmFtrAnag.vSediLavoro.join() + ")") //frmFtrAnag.vSediLavoro
			if (frmFtrAnag.vFilterPosizioneInps && frmFtrAnag.vPosizioniInps)
				sqlFiltri += (" AND L.PosizioneInps IN (" + frmFtrAnag.vPosizioniInps.join() + ")") //frmFtrAnag.vPosizioniInps
		}
		else if (frmFtrAnag.vFilterSedeLavoro && frmFtrAnag.vSediLavoro)
		{
			sqlFiltri += (" AND L.idDittaSede IN (" + frmFtrAnag.vSediLavoro.join(',') + ")")
						
			if (frmFtrAnag.vFilterPosizioneInps &&  frmFtrAnag.vPosizioniInps)
				sqlFiltri += (" AND L.PosizioneInps IN (" + frmFtrAnag.vPosizioniInps.join(',') + ")") //frmFtrAnag.vPosizioniInps
		}
		else if (frmFtrAnag.vFilterPosizioneInps && frmFtrAnag.vPosizioniInps)
			sqlFiltri += (" AND L.PosizioneInps IN (" + frmFtrAnag.vPosizioniInps.join(',') + ")") //frmFtrAnag.vPosizioniInps
	}
	
	if(frmFtrAnag.vFilterGruppiLavoratori && frmFtrAnag.vGruppoLavoratori != '')
	{
		var params = globals.inizializzaParametriAttivaMese
		(
			idDitta, 
            periodo ? periodo : forms.pann_header_dtl.anno * 100 + forms.pann_header_dtl.mese,
			globals.getGruppoInstallazioneDitta(idDitta), 
			frmFtrAnag.vGruppoLavoratori,
			globals._tipoConnessione
		);
		
        var dipendenti = globals.getLavoratoriGruppo(params,params.idditta);

		sqlFiltri += (" AND L.idLavoratore IN (" + dipendenti.join(',') + ")");
	}
	
    var dsFiltri = databaseManager.getDataSetByQuery(globals.Server.MA_PRESENZE,sqlFiltri,arrFiltri,-1);
    
	return dsFiltri;
}

/**
 * @AllowToRunInFind
 * 
 * TODO generated, please specify type and doc for the params
 * 
 * @param {JSFoundset<db:/ma_anagrafiche/lavoratori>} fs
 *
 * @properties={typeid:24,uuid:"EBBE5B1F-83B8-4131-BC86-AAFD6E4D80DC"}
 */
function FiltraLavoratoriPannello(fs)
{
	/** @type {JSFoundset<db:/ma_anagrafiche/lavoratori>}*/
	var fsLav = databaseManager.getFoundSet(globals.Server.MA_ANAGRAFICHE,globals.Table.LAVORATORI);
	var frm = forms.svy_nav_fr_openTabs;
	var params = globals.objGiornParams[frm.vTabNames[frm.vSelectedTab]];
	if(fsLav.find())
	{
		fsLav.idditta = params['idditta'];
		fsLav.assunzione = '<=' + utils.dateFormat(params['al'],globals.ISO_DATEFORMAT)
		fsLav.cessazione = '^||>=' + utils.dateFormat(params['dal'],globals.ISO_DATEFORMAT);
		
		/** @type {Array<Number>}*/
		var arrDipFiltrati = params['dipendenti_filtrati'];
		
		if(arrDipFiltrati.length > 0)
		   fsLav.idlavoratore = arrDipFiltrati;
		
		fsLav.search();
	}
	
	var dipGiornaliera = globals.foundsetToArray(fsLav,'idlavoratore');
	
	fs.addFoundSetFilterParam('idlavoratore','IN',dipGiornaliera);
	
	return fs;
	
}

/**
 * @AllowToRunInFind
 * 
 * @return {Array<Number>}
 *
 * @properties={typeid:24,uuid:"CEEAE033-47B6-41D3-A622-9734659B64CA"}
 */
function getLavoratoriPannello()
{
	/** @type {JSFoundset<db:/ma_anagrafiche/lavoratori>}*/
	var fsLav = databaseManager.getFoundSet(globals.Server.MA_ANAGRAFICHE,globals.Table.LAVORATORI);
		
	var frm = forms.svy_nav_fr_openTabs;
	var idditta = globals.objGiornParams[frm.vTabNames[frm.vSelectedTab]].idditta;
	var dal = globals.objGiornParams[frm.vTabNames[frm.vSelectedTab]].dal;
	var al = globals.objGiornParams[frm.vTabNames[frm.vSelectedTab]].al;
   
	/** @type {Array<Number>} */
	var arrDipFiltrati = globals.objGiornParams[frm.vTabNames[frm.vSelectedTab]].dipendenti_filtrati;
	
	if(fsLav.find())
	{
		fsLav.idditta = idditta;
		fsLav.assunzione = '<=' + utils.dateFormat(al,globals.ISO_DATEFORMAT)
		fsLav.cessazione = '^||>=' + utils.dateFormat(dal,globals.ISO_DATEFORMAT);
		
		if(arrDipFiltrati.length > 0)
		   fsLav.idlavoratore = arrDipFiltrati;
		
		fsLav.search();
	}
	
	/** @type {Array<Number>} **/
	var dipGiornaliera = globals.foundsetToArray(fsLav,'idlavoratore');
	
	return dipGiornaliera;
}

/**
 * Aggiorna la visualizzazione dei dati del pannello a seconda della situazione 
 * reimpostando i parametri se necessario
 * 
 * @param {Number} idDitta
 * @param {Number} anno
 * @param {Number} mese
 * @param {JSEvent} event
 *
 * @properties={typeid:24,uuid:"F0FC9D2A-0823-467B-915F-A4D19A2149DD"}
 */
function aggiornaVisualizzazionePannello(idDitta,anno,mese,event)
{
	// switch per differenziare comportamento a seconda del tab selezionato 
	var frm = forms.svy_nav_fr_openTabs;
	/** @type {RuntimeTabPanel}*/
	var tabElements = forms['LEAF_Pannello_tab'].elements['tabs'];
		
	if(!globals.haOrologio(idDitta))
	{
		if(tabElements.tabIndex == 2)
			tabElements.tabIndex = 1;
	    tabElements.setTabEnabledAt(2,false);
	}
	else
		tabElements.setTabEnabledAt(2,true);
	
	if (frm.vSelectedTab != null && globals.objGiornParams[frm.vTabNames[frm.vSelectedTab]]) 
	{
		var frmHeader = forms.pann_header_dtl;
		var dsFiltri = globals.ottieniDipendentiFiltriAnagrafici(idDitta,anno != null ? anno : globals.objGiornParams[frm.vTabNames[frm.vSelectedTab]].anno * 100 
				                                                         + mese != null ? mese : globals.objGiornParams[frm.vTabNames[frm.vSelectedTab]].mese);
		
		if(dsFiltri.getMaxRowIndex() > 0)
			frmHeader.arrDipFiltriAnagrafici = dsFiltri.getColumnAsArray(1);
		else
			frmHeader.arrDipFiltriAnagrafici = []; 
		
		frmHeader.foundset.loadRecords(idDitta);
		frmHeader.anno = anno;
		frmHeader.mese = mese;
		
		var ggUltimo = ((globals.TODAY.getMonth() + 1) == mese) ? globals.TODAY.getDate() : globals.getTotGiorniMese(mese,anno); 
		
		// aggiornamento dell'oggetto parametri del program relativo al pannello
		var _params = globals.objGiornParams[frm.vTabNames[frm.vSelectedTab]];
		_params.idditta = idDitta;
		_params.anno = anno;
		_params.mese = mese;
		_params.dal = new Date(anno,mese - 1,1);
		_params.al = new Date(anno, mese - 1, ggUltimo);
		_params.dipendenti_filtrati = frmHeader.arrDipFiltriAnagrafici;
		
		switch(_params['selected_tab'])
		{
			case 1:
				forms.pann_flusso_dtl.mostraTabs();
				break;
			case 2:
				forms.giorn_timbr_mancanti_ditta.refreshAnomalieDitta(event);
				break;
			case 3:
				forms.giorn_list_squadrati_ditta.refreshSquadratureDitta();
				break;
			default:
				break;
		}
	    
	}
	else
	   forms.pann_flusso_dtl.mostraTabs();
		
}