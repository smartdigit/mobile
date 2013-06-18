//1. initialization

var localDB = null;

function onInit(){
    try {
        if (!window.openDatabase) {
            updateStatus("Error: DB not supported");
        }
        else {
            initDB();
            createDB();
        }
    } 
    catch (e) {
        if (e == 2) {
            updateStatus("Error: Invalid database version.");
        }
        else {
            updateStatus("Error: Unknown error " + e + ".");
        }
        return;
    }
}

function initDB(){
    var shortName = 'mobi';
    var version = '1.0';
    var displayName = 'mobi';
    var maxSize = 9999999999; //in bytes
    localDB = window.openDatabase(shortName, version, displayName, maxSize);
}

function createTables(query, counter){
    try {
		localDB.transaction(function(transaction){
			transaction.executeSql(query, [], nullDataHandler, errorHandler);
			updateStatus("Table '"+counter+"' is present");
		});
	} catch (e) {
		updateStatus("Error: Unable to create table '"+counter+"' " + e + ".");
		return;
	}
}
 function createDB(){
	var query = ["", 
				 "CREATE TABLE IF NOT EXISTS Users (ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, AppUserID INTEGER NOT NULL , AppUserName VARCHAR NOT NULL, AppUserPassword VARCHAR NOT NULL);", 
				 "CREATE TABLE IF NOT EXISTS CustomerLedgerAccount (InternalID INTEGER, ReconciledFlag VARCHAR, CreateDate DATETIME, DeferredPaymentDate DATETIME, ContractReferenceNumber VARCHAR, TransSerial VARCHAR NOT NULL, TransDocument VARCHAR NOT NULL, TransDocNumber INTEGER NOT NULL, TransInstallmentID INTEGER, TotalAmount REAL, TotalPendingAmount REAL, OperationID INTEGER, TotalAccountSign INTEGER, BalanceAmount REAL, BalanceAccountSign INTEGER, PartyTypeCode INTEGER, PartyID INTEGER NOT NULL, SalesManID INTEGER, CurrencyID VARCHAR, CurrencyExchange REAL, CurrencyFactor INTEGER, EschangeDifCurrency REAL, RetentionTotalAmount REAL, RetentionPendingAmount REAL, DebitTotalAmount REAL, CreditTotalAmount REAL, TransStatus INTEGER, LedgerCounter INTEGER, PartyAccountTypeID VARCHAR, OriginTransSerial VARCHAR, OriginTransDocument VARCHAR, OriginTranDocNumber INTEGER, PartyAddressID INTEGER, PRIMARY KEY (TransSerial, TransDocument, TransDocNumber, PartyID));", 
				 "CREATE TABLE IF NOT EXISTS Customer (CustomerId INTEGER NOT NULL PRIMARY KEY, PartyId INTEGER, CustomerKey VARCHAR, CreateDate DATETIME, OrganizationName VARCHAR, FederalTaxId VARCHAR, KeyFederalTaxId INTEGER, PersonalIDNumber VARCHAR, SalesManId INTEGER, ZoneId INTEGER, PaymentId INTEGER, TenderId INTEGER, CarrierId INTEGER, EmailAddress VARCHAR, Telephone1 VARCHAR, Telephone2 VARCHAR, Telephone3 VARCHAR, Telephone4 VARCHAR, MobileTelephone1 VARCHAR, MobileTephone2 VARCHAR, Fax VARCHAR, CustomerGroupDescription VARCHAR, PriceLineId INTEGER, CustomerLevel INTEGER, LastTransSerial VARCHAR, LastTransDocNumber INTEGER, LastTransDicument VARCHAR, LimitType INTEGER, LimitPurchaseDays INTEGER, LimitPuchaseValue INTEGER, LimitPurchaseCurrencyId VARCHAR, LimitPurchaseEchange INTEGER, LimitPurchaseFactor INTEGER, DirectDicount INTEGER, GlobalDiscount INTEGER, Comments VARCHAR, AplyRetentionTax VARCHAR, RetentionTax INTEGER, TemporaryId INTEGER, Locked VARCHAR, CardId VARCHAR, UseIntraStat VARCHAR, ActiveParty VARCHAR, CashDiscountTermId VARCHAR, TaxablePesonType INTEGER);", 
				 "CREATE TABLE IF NOT EXISTS Item (ItemID VARCHAR PRIMARY KEY, ItemType INTEGER, BarCode VARCHAR, BarcodeType INTEGER, BinLocation VARCHAR, UnitOfSaleID VARCHAR, TaxableGroupID INTEGER, ItemTax REAL, ItemTax2 REAL, ItemTax3 REAL, CurrencyID VARCHAR, CurrencyFactor REAL, CurrencyExchange REAL, PhysicalQty REAL, LastOutgoingDate VARCHAR, SupplierID INTEGER, FamilyID INTEGER, OriginCountryID VARCHAR, Discontinued VARCHAR, ItemPictureName VARCHAR);",
				 "CREATE TABLE IF NOT EXISTS ItemNames (ItemID VARCHAR NOT NULL, LanguageID VARCHAR NOT NULL, ShortDescription VARCHAR, Description VARCHAR, PRIMARY KEY(ItemID, LanguageID));",
				 "CREATE TABLE IF NOT EXISTS ItemSellingPrices  (ItemID  VARCHAR NOT NULL, SizeID  INTEGER, LotID  VARCHAR, PriceLineID  INTEGER NOT NULL, CreateDate  DATETIME, UnitPrice  REAL, TaxIncludedPrice  REAL, FixedProfitRate  REAL, CurrencyID  VARCHAR, CurrencyFactor  REAL, CurrencyExchange  REAL, PRIMARY KEY(ItemID, PriceLineID));",
				 "CREATE TABLE IF NOT EXISTS Stock  (ItemId  VARCHAR NOT NULL, LotID  VARCHAR, ColorID  INTEGER, SizeID  INTEGER, WarehouseID  INTEGER NOT NULL, CustomerOrderQty  REAL, SupplierOrderQty  REAL, CustomerConsignmentQty  REAL, SupplierConsignmentQty  REAL, AvailableQty  REAL, PhysicalQty  REAL, CustomerOrderUnits  REAL, SupplierOrderUnits  REAL, CustomerConsignmentUnits  REAL, SupplierConsignmentUnits  REAL, AvailableUnits  REAL, PhysicalUnits  REAL, LastReceivedDate  DATETIME, LastOutgoingDate  DATETIME, LastCostPrice  REAL, TaxIncludedLastCostPrice  REAL, AverageCostStockValue  REAL, LastCostStockValue  REAL, ReorderPoint  REAL, RestockLevel  REAL, BinLocation  VARCHAR, CurrencyID  VARCHAR, CurrencyExchange  REAL, CurrencyFactor  VARCHAR, PRIMARY KEY(ItemID, WarehouseID));",
				 "CREATE TABLE IF NOT EXISTS SyncLog  (Id  INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL  , LastSyncDate  DATETIME DEFAULT CURRENT_TIMESTAMP);",
				 "CREATE TABLE IF NOT EXISTS UserLog (Id  INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL , UserId  INTEGER NOT NULL, DateTimeLog  DATETIME NOT NULL);"];
	
	for(var i=1; i<query.length; i++){
		createTables(query[i], i);
	}
 }

// 3. misc utility functions

// db data handler

errorHandler = function(transaction, error){
    updateStatus("Error: " + error.message);
    return true;
}

nullDataHandler = function(transaction, results){}

// update view functions

function updateForm(id, amount, name){
    document.itemForm.id.value = id;
    document.itemForm.amount.value = amount;
    document.itemForm.name.value = name;
}

function updateStatus(status){
    //alert(status);
}

