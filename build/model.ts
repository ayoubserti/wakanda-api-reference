

interface ModelDataClassAttribute {
    /**
	*(String attributes only) true if Wakanda automatically builds a list of possible values based on existing values
	* `model.City.country.autoComplete = true`
	*/
	autoComplete: Boolean;
	
	
	
	/**
	*(UUID attributes only) true if the attribute has the autogenerate property on
	* `model.Article.IDCode.autogenerate = true;`
	*/
	autogenerate: Boolean;
	
	
	/**
	*(number attributes only) true if the attribute has the autosequence property on
	* `model.Company.ID.autosequence = true;`
	*/
	autosequence: Boolean;
	
	
	
	/**
	*Size in bytes below which the data of the BLOB attribute will be stored within entities (default=0)
	*
	*/
	blob_switch_size: Number;
	/**
	*(Image and Blob attributes only) Client-side cache duration (seconds)
	*/
	cacheDuration: Number;
	/**
	*(relation attributes only) true to generate an array (instead of an entity collection)
	*/
	composition: Boolean;
	
	
	
	/**
	*Default format properties
	*/
	defaultFormat: Object;
	
	
	
	
	
	/**
	*(Number, Long, Long64 attributes only) Default value for the attribute
	* ```model.Person.age.defaultValue = 20;```
	*/
	defaultValue: Number;
	
	
	
	/**
	*Object containing events for the attribute
	* For a description of the events handlers [visit the dedicated section here] (attributeevent.html)
	*/
	events: ModelAttributeEvent;
	
	
	
	
	/**
	*(String attributes only) Length of the attribute value
	*
	* ```javascript 
	* model.Person.phone.fixedLength = 10;
	* ```
	*/
	fixedLength: Number;
	
	
	
	
	/**
	*Index kind of the attribute: "btree", "cluster", "keywords", "auto" or "objectPath"
	* The following values are available:
	* - "btree": associates a B-Tree type index with the attribute. This multipurpose index type meets most indexing requirements.
	* - "cluster": associates a B-Tree type index using clusters with the attribute. This architecture is more efficient when the index does not contain a large number of keys, i.e., when the same values occur frequently in the data.
	* - "keywords": (only available for attributes of type String) associates a keyword type index to the attribute. This index type facilitates fast searching of individual words inside of these attributes.
	* - "auto": Wakanda automatically selects an index type according to the attribute type.
	* - objectPath": (only available for attributes of type Object) associates an index to the object attribute. All object property paths are automatically indexed.
	*
	* ```javascript
	* model.Employee.lastname.indexKind = "btree";
	* ```
	*/
	indexKind: String;
	
	
	
	/**
	*Attribute kind: "storage", "calculated", "alias", "relatedEntity", "relatedEntities", or "removed"
	* Available values are:
	* - "storage": to store simple scalar values such as strings, longs, etc.
	* - "calculated": to store scalar values based on a calculation, such as lastName+name
	* - "alias": an attribute built upon a relation attribute
	* - "relatedEntity": a N->1 relation attribute
	* - "relatedEntities": a 1->N relation attribute
	* - "removed": in the context of a derived datastore class, to remove the inherited attribute from the class
	*
	* ```javascript
	* - model.Employee.manager.kind = "relatedEntity"
	* ```
	*/
	kind: String;
	
	
	/**
	*Length limit of the entered text (the rest will be truncated)
	* ```javascript
	* model.Article.code.limiting_length = 10;
	* ``` 
	* 
	*/
	limiting_length: Number;
	
	
	
	
	/**
	*Previous name(s) for the attribute at the database level
	*/
	matchColumn: String;
	
	
	
	/**
	*(String attributes only) Maximum length allowed for the attribute
	* ```javascript
	* model.Article.comment.maxLength = 100;
	*```
	* @warning If the text entered is longer than the value defined for this property, an error is returned.
	*/
	maxLength: Number;
	
	/**
	*(String attributes only) Minimum length allowed for the attribute
	* @warning If the text entered is longer than the value defined for this property, an error is returned.
	* ```javascript
	* model.Article.comment.maxLength = 100;
	* ```
	*/
	minLength: Number;
	
	
	
	/**
	*(Number, Long, Long64 attributes only) Maximum value for the attribute
	*  @warning If the value entered is more than this property, an error is returned.
	* ```javascript
	* model.Person.score.maxValue= 5000;
	* ```
	*/
	maxValue: Number;
	
	
	
	/**
	* (Number attributes only) Minimum value for the attribute
	* @warning If the value entered is less than this property, an error is returned.
	* ```javascript
	* model.Article.comment.maxLength = 100;
	* ```
	*/
	minValue: Number;
	
	
	
	
	/**
	*true if the attribute contains multi-line values
	* ```javascript
	* model.Employee.comments.multiLine = true
	* ```
	*/
	multiLine: Boolean;
	
	
	
	
	/**
	*true = attribute value cannot be null
	* ```javascript
	* model.Country.name.not_null = true;
	* ```
	*/
	not_null: Boolean;
	
	
	/**
	* (calcutaled Attributes) JavaScript  function to call for evaluating a calculated attribute
	* ### Example :
	* ```javascript
	* //We define the 'onGet' method for the hired Boolean attribute:
	* model.Employee = new DataClass("Employees");
	* model.Employee.hiringDate = new Attribute("storage", "date");
	* model.Employee.hired = new Attribute("calculated", "bool");
    * // onGet function
	* model.Employee.hired.onGet = function()
* {
*    return this.hiringDate != null;
* }
* ```

	*/
	onGet: Function;
	
	
	
	/**
	* (calcutaled Attributes)JavaScript function to call for processing a value entered in a calculated attribute
	* ### Example 
	* ```javascript
	* model.Employee = new DataClass("Employees");
	* model.Employee.lastName = new Attribute("storage", "string");
	* model.Employee.firstName = new Attribute("storage", "string");
	* model.Employee.fullName = new Attribute("calculated", "string");
    // onSet function
	* model.Employee.fullName.onSet = function(value)
* { 
  *  var names = value.split(' '); //split value into an array 
  *  this.firstName = names[0];  
  *  this.lastName = names[1];
* }
* ```
	*/
	onSet: Function;
	
	
	/**
	* (calcutaled Attributes) JavaScript function to call when a query uses the calculated attribute
	* ### Note  
	* The function will receive two parameters: the comparison operator (e.g. “>”, “>=”, etc.) and the compared value.
	*
	* ### Example :
	* ```javascript
	* model.Employee = new DataClass("Employees");
	* model.Employee.hiringDate = new Attribute("storage", "date");
	* model.Employee.hired = new Attribute("calculated", "bool");
    * // onGet function
	* model.Employee.hired.onGet = function()
* {
 *   return this.hiringDate != null;
* }
*  // onQuery function
* model.Employee.hired.onQuery = function(compareOperator, compareValue)
* {
*    var newOper;
*    if (compareOperator === "=" || compareOperator === "==")
*    {
*        if (compareValue === true)
*            newOper = "is not";
*        else
*            newOper = "is";
*    }
*    else
*    {
*        if (compareValue === true)
*            newOper = "is";
*        else
*            newOper = "is not";
*    }
*    return "hiringDate "+newOper+" null";
* }
* ```
	*/
	onQuery: Function;
	
	
	/**
	*(calcutaled Attributes) JavaScript function to call when a calculated attribute is sorted
	* ### Example
	* ```javascript
	* This example shows how to sort an age calculated attribute on a birthdate storage value:
* model.Employee = new DataClass("Employees");
* model.Employee.birthdate = new Attribute("storage", "date", "btree");
* model.Employee.age = new Attribute("calculated", "long");
*    // onGet function
* model.Employee.age.onGet = function()
* {
*    if (this.birthdate == null)
*        return null;
*    else
*    {
*        var today = new Date();
*        var interval = today.getTime() - this.birthdate.getTime();
*        var nbYears = Math.floor(interval / (1000 * 60 * 60 * 24 * 365.25));
*        return nbYears;
*    }
* }
*
*    // onSort function
* model.Employee.age.onSort = function(ascending)
 * {
*    if (ascending)
*        return "birthdate";
*    else
*        return "birthdate desc";
* }
* ```
	*/
	onSort: Function;
	
	
	
	
	
	/**
	*true to store BLOB data outside of the data file (default=false)
	* ```javascript
	* model.Article.techDoc.outside_blob = true;
	* ```
	*/
	outside_blob: Boolean;
	
	
	
	/**
	*Path for a related or an alias attribute
	* ```javascript
	* model.Employee.workingPlace = new Attribute("relatedEntity", "City");
	* model.Employee.workingPlace.path = "employer.location"; // relation to the City class
	* ```
	*/
	path: String;
	
	
	/**
	*(String attributes only) RegEx pattern to control data entry
	* ```javascript
	* model.Article.code.pattern = "^[A-Za-z]+$" // only letters
	* ```
	*/
	pattern: String;
	
	
	/**
	*true if the attribute is the primary key
	* ```javascript
	* model.Company.name.primKey = true;
	* ```
	*/
	primKey: Boolean;
	
	
	
	/**
	*Attribute is read-only (can only be set by the code - i.e Not via the Model Designer)
	* ```javascript
	*  model.Company.name.primKey = true;
	* ```
	*/
	readOnly: Boolean;
	
	
	/**
	* (relation attributes only) true if the relation attribute uses the reverse path of an existing relation
	* 
*  More information are available in [Model API - Attribute section here](http://doc.wakanda.org/Model/Attribute-Constructor/Attribute.301-995679.en.html)
	* 
	*/
	reversePath: Boolean;
	
	
	
	
	/**
	*"public" (default) or "publicOnServer"
	* ```javascript
	* model.Employee.salary.scope = "publicOnServer";
	* ```
	*/
	scope: String;
	
	
	/**
	*(Date attributes only) true if the date attribute stores only the "MM/DD/YYYY" format (Otherwise, date values include the time, stored in UTC)
	* ```javascript
	* model.Employee.birthdate.simpleDate = true;
	* ```
	*/
	simpleDate: Boolean;
	
	
	
	
	/**
	*true if queries and sorts carried out in the data stored in the attribute do not take any style tags into account
	* ```javascript
	* model.Employee.comments.styled_text = true
	* ```
	*/
	styled_text: Boolean;
	
	
	
	/**
	*Type of the attribute
	* ### description
	* For storage, calculated or alias attributes, type can be one of the standard supported Wakanda data types:
* - "blob"
* - "bool"
* - "byte"
* - "date"
* - "duration"
* - "image"
* - "long"
* - "long64"
* - "number"
* - "string"
* - "uuid"
* - "word"
* - "object"
*
*  Note :
*  - For relatedEntity attributes, type is the datastore class name corresponding to the 'one' class
*  - For relatedEntities attributes, type is the datastore class name corresponding to the 'many' class
*
* ```javascript
* model.Employee.birthdate.type = "date";
* ```
*
	*/
	type: String;
	
	
	/**
	*true if values in the attribute must be unique
	* @warning When this property is true, Wakanda returns an error when an entered value is duplicated.
	*
	* ```javascript
	*  model.Country.name.unique =  true;
	* ```
	*/
	unique: Boolean;
	
	
	
	
	/**
	*associate an event listener function with the attribute
	* See the [event section](attributeevent.html) for more information
	* ### Note:
	* You can define events through the events property of the attribute. 
	* However, using the addEventListener( ) method, you can define several event listeners for the same event compared to the events property, which can only define one handler for an event
	*
	* ### Exemple
	* ```javascript
	* model.Person.name.addEventListener("set", function(event) { 
    * this.name = this.name.capitalize();
	* });
	*
	* model.Person.name.addEventListener("set", function(event) { 
    * this.name = this.name+"_";
	* })
	* ```
	*/
	addEventListener(event: String, jsCode: Function) : void;
}

declare var Attribute : {
	new (name:String, kind:String, type:String , indexOrPath?:String, options?:Object): ModelDataClassAttribute;
}
interface ModelAttributeEvent {
	clientRefresh(event:ModelAttributeEventObject):any;
	init(event:ModelAttributeEventObject):any;
	load(event:ModelAttributeEventObject):any;
	remove(event:ModelAttributeEventObject):any;
	save(event:ModelAttributeEventObject):any;
	set(event:ModelAttributeEventObject):any;
	validate(event:ModelAttributeEventObject):any;
	validateremove(event:ModelAttributeEventObject):any;
}

interface ModelAttributeEventObject {
	
}

interface ModelDataClass {
	/**
	*Methods of the Datastore class applied to Collection objects
	*/
	collectionMethods: Object;
	/**
	*Methods of the Datastore class applied to Entity objects
	*/
	entityMethods: Object;
	/**
	*Object containing events for the datastore class
	*/
	events: Object;
	/**
	*Methods of the Datastore class applied to Class object
	*/
	methods: Object;
	/**
	*Object containing properties for the datastore class
	*/
	properties: Object;
	/**
	*adds a new attribute to the datastore class
	*/
	addAttribute(name: String, kind: String, type: String, indexOrPath?: String, options?: Object) : ModelDataClassAttribute;
	/**
	*adds a new attribute to the datastore class
	*/
	addAttribute(name: String, kind: any, type: String, indexOrPath?: String, options?: Object) : ModelDataClassAttribute;
	/**
	*associate an event listener function with the datastore class
	*/
	addEventListener(event: String, jsCode: Function) : void;
	/**
	*define a datastore class method and add it to the current class
	*/
	addMethod(name: String, type: String, jsCode: Function, scope?: String) : void;
	/**
	*
	*/
	addRelatedEntities(name: String, type: String, path?: String, option?: Object) : void;
	/**
	*adds a new relatedEntity attribute to the datastore class
	*/
	addRelatedEntity(name: String, type: String, path?: String, option?: Object) : void;
	/**
	*removes the name attribute from the datastore class for the model object
	*/
	removeAttribute(name: String) : void;
	/**
	*define one or several properties for the datastore class
	*/
	setProperties(properties: Object) : void;
	/**
	*associate a restricting query with the datastore class
	*/
	setRestrictingQuery(queryStatement: String) : void;
}

declare var DataClass : {
	new ( collectionName?:String, scope?:String, extendedClass?:String, properties?:Object) : ModelDataClass;
}




interface Model {
	/**
	*adds a new datastore class to the current procedural model
	*/
	addClass(className: String, collectionName: String, scope: String, extendedClass: String, properties?: Object) : ModelDataClass;
	/**
	*allows you to reference and use a remote catalog in your current Wakanda model reference
	*/
	
	/**
	 * deprecated  
	 * mergeOutsideCatalog(localName: String, mergeInfo: String, user: String, password?: String) : void;
	/**
	*allows you to reference and use a remote catalog in your current Wakanda model reference
	*/ 
	/** DEPERECATED 
	 * mergeOutsideCatalog(localName: String, mergeInfo: Object, user: String, password?: String) : void;
	/**
	*allows you to reference and use a remote catalog in your current Wakanda model reference
	*/
	/** DEPERECATED
	 *mergeOutsideCatalog(localName: String, mergeInfo: String, user: String, password?: String) : void; 
	 */
	
	/**
	 *allows you to reference and use a remote SQL catalog in your current Wakanda model
	 mergeSQLCatalog(localName: String, mergeInfo: SQLConnectionOptions) : void;
	 */
}/** 
   interface SQLConnectionOptions {
    /**
     * Address of the remote SQL server you want to connect to
     *
	hostname: string,
    /**
     * Port number of the SQL server
     *
    port: number,
    /**
     * User name required to login to the SQL server for opening an outside session
     *
    user: string, 
    /**
     * Password required to login to the SQL server for opening an outside session
     *
    password: string,
    /**
     * Name of the remote SQL database from which you want to replicate the catalog
     *
    database: string,
    /**
     *  (optional) custom name for the JavaScript configuration file to associate with the localName catalog
     *
    jsFile: string,
    /**
     *  true to open a secured connection to the SQL server, and false or omit the property to open a standard connection
     *
    ssl: boolean,
    /**
     * Kind of the remote SQL database. Currently, only "mysql" is supported
     *
    dbType: "mysql"
}
*/

