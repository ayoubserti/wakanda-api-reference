/// <reference path="./folder.d.ts" />
/// <reference path="./datastoreentitycollection.d.ts" />
/// <reference path="./datastoreentity.d.ts" />

interface DatastoreClass {
/**
	*Collection of available attributes
	*
	* @returns Object containing all the attributes of the DatastoreClass
	* 
	* ```ds.MyDataclass.attributes```
	*/
	attributes: AttributeEnumerator;
	
	
	/**
	*Number of entities in the datastore class
	*  
	* ```javascript
	* ds.MyDataclass.length
	* ```
	*/
	length: Number;
	
	
	/**
	*returns an object of type EntityCollection containing all the entities in the datastore class
	*
	* ```javascript
	* ds.MyDataclass.all()
	* ```
	*/
	all() : EntityCollection;
	
	
	
	
	
	/**
	*returns the arithmetic average of all the non-null values of attribute for the datastore class or entity collection
	* ### For a detailled description of the method, [go here](entitycollection.html#average) 
	*/
	average(attribute: DatastoreClassAttribute, distinct?: Boolean) : Number;
	
	
	
	
	/**
	* Compute performs, in a single call, all the statistical calculations on the attribute or list of attributes passed as the parameter for the datastore class or entity collection
	* @param attribute DatastoreClassAttribute,String Attribute(s) for which you want to perform statistical calculations
	* @param distinct Boolean Compute distinct calculations - `false` by default
	* @returns Object containing the following calculations :
	* 	- average	Arithmetic average
	*	- averageDistinct	Average taking only distinct values into account
	*	- count	Number of values
	*	- countDistinct	Number of distinct values
	*	- max	Maximum value
	*	- min	Minimum value
	*	- sum	Sum
	*	- sumDistinct	Sum taking only distinct values into account
	*
	* @warning If you pass more than one attribute and enable the Distinct calculations, they will be valid only for the first attribute.
	* #### Example 1 - Compute Multi Attributes with Distinct
	*  ```javascript
	*  var calculations = ds.Employee.compute("age, salary", true); //the Distinct operations will be performed only on the `age` attribute
	*  var stats = "Average age ="+ calculations.age.averageDistinct+" Total salary ="+calculations.salary.sum);
	* ```
	*/
	compute(attribute: DatastoreClassAttribute, distinct?: Boolean) : Object;
	/** 
	* Compute performs, in a single call, all the statistical calculations on the attribute or list of attributes passed as the parameter for the datastore class or entity collection
	* @param attribute DatastoreClassAttribute,String Attribute(s) for which you want to perform statistical calculations
	* @param groupBy DatastoreClassAttribute,String Attribute(s) on which you want to have subtotal breaks	
	* @returns Object containing all the calculations performed and subtotals
	* #### Example 1 - Compute with groupBy 
	* ```javascript
	*  var stats = ds.Sales.all().compute("benefit, revenues", "country, month");
    * // compute `benefit`and `revenues` values of a Sales class grouped by country and month
	* // for more convenience the returned object can be converted into an array 
	* stats.toArray();
	* ```
	*/
	compute(attribute: DatastoreClassAttribute, groupBy?: DatastoreClassAttribute) : Object;
	
	
	
	
	
	
/**
	* The Count() method returns the number of entities contained in the entity collection or datastore class
	* @param attribute DatastoreClassAttribute,String Attribute whose value must not be null
	* @param distinct Boolean  Default `false` Use only entities that have different values
	* @returns Number of entities in the collection or Dataclass
	* @warning `distinct` parameter is ignored if you do not pass the `attribute` parameter
	* #### Example 1
	* ```javascript
	* ds.DataClass1.query('name > 1*').count('name2', true)
	* ```
	* #### Example 2 - Count on object attribute
	* ```javascript
	* var vCount = ds.MyClass.all().count("objectAtt.prop") // `objectAtt` is an object attribute with a `prop` property
	* ```
	*/
	count(attribute: DatastoreClassAttribute, distinct?: Boolean) : Number;
	
	
	
	
	
	/**
	*creates a new blank object of type Entity based on the datastore class.
	* 
	* @warning
	* The object is created in memory and is not saved in the datastore until the save( ) method is called. 
	* If the object is deleted before being saved, it cannot be recovered.
	* 
	* #### Example (create then save)
	* ```javascript
	* var newCompany = ds.Company.createEntity() ;
	* a.name = 'Wakanda';
	* a.city = 'Paris' ; 
	* a.save() ;
	* ```
	*  
	* ### Note
	* Another useful alternative way to create entities (then save) is to use the `new` syntax
	* ```javascript
	* new ds.Company({
		name : 'Wakanda' ,
		city : 'Paris'
	}).save();
	* 
	*/
	createEntity() : Entity;
	
	
	
	
	
	
	
	/**
	*creates a new blank object of type EntityCollection attached to the datastore class 
	*
	* @param keepSorted Boulean - `True` to create a SortedCollection (`false` by Default)
	*
	*
	* #### Note
	* For more information about sorted/unsorted collection, [visit this page](http://doc.wakanda.org/Datastore/Entity-Collection/Unsorted-vs-Sorted-Entity-Collections.300-932765.en.html)
	*
	* #### Example 1
	* ```javascript
	* var all = ds.Person.all(); // get all the entities
	* var coll1 = ds.Person.createEntityCollection(); // create an empty unsorted entity collection
	* coll1.add( all[10]); //add some entities, one of them 3 times
	* coll1.add( all[9]);
	* coll1.add( all[8]);
	* coll1.add( all[7]);
	* coll1.add( all[8]);
	* coll1.add( all[8]);
	* coll1; // displays the collection
	* ```
	*/
	createEntityCollection(keepSorted?: Boolean) : EntityCollection;
	
	
	
	
	
	
	/**
	* The distinctValues( ) method creates an array and returns in it all the distinct values stored in attribute for the entity collection or datastore class
	* @param attribute DatastoreClassAttribute 		Attribute for which you want to get the list of distinct values
	* @returns  Array containing the list of distinct values
	* #### Example 1
	* ```javascript
	* //In our example, we want to return the total number of different jobs in the same company:
    *
	* var employer = ds.Company.find( "name == :1", "WAKANDA" ) ;  // find the company by its name
	* var allEmp = ds.Employee.query("comp == :1", employer); // create an entity collection containing all the employees in a company
	* // 'comp' is a relation attribute in Employee
	*  var jobNb = allEmp.distinctValues("jobName").length; //`jobName` is a DatastoreClassAttribute of Employee
    * ``` 
	* #### Example 2 - distinctValues with Object Attributes.
	* ```javascript
	* // In a "keywords" object attribute of an Article datastore class, you store the page numbers for each keyword in a "pages" array. 
	* // You want to know all pages that contain at least one keyword
	*  var arr = ds.Article.all().distinctValues("keywords.pages[]");
	* ``` 
	*/
	distinctValues(attribute: DatastoreClassAttribute): any[];
	
	
	

    /**
	*exports all the entities stored in the object for which it is called in JSON format
	* It can be called for a :
	* 	- datastore 
	*	- DatastoreClass 
	*	- EntityCollection
	* @warning : 
	* - calculated attributes are not exported -- only their underlying attributes are exported,
	* - extended datastore classes are not exported,
	* - related or alias attributes are not exported directly -- only primary keys values are exported,
	* - data from outside catalogs or datastores are not exported	
	* #### Example :
	* ```javascript
	* myFolder = new Folder("C:/ExportCollectionJSON/");     // get a reference to the export folder
	* if (myFolder.exists)     // if the folder actually exists
	* {
    *	var coll=ds.Employee.query("lastName = :1", "P*");   
    *	coll.exportAsJSON( myFolder ) ;     // export the collection
	*	}
	* ```
	*For more details, go here : http://doc.wakanda.org/home2.en.html%23/Datastore/Entity-Collection/length.303-638616.en.html#/Datastore/Entity-Collection/exportAsJSON.301-1041820.en.html
	*
	* @param exportFolder Folder Folder where you want to export the collection.
	* @param numFiles Number Maximum number of files per Folder
	* @param fileLimitSize	Number Size limit vamue of export files (in KB)
	* @param attLimitSize Number Size limit (in bytes) velow which the contents of a BLOB or Picture attribute are embedded into the main file
	*  
	*/
	exportAsJSON(exportFolder: WAKFolderInstance, numFiles?: Number, fileLimitSize?: Number, attLimitSize?: Number) : void;
	
	
	
	
	
/**
	*exports all the entities stored the object for which it is called in SQL format
	* It can be called for a :
	* 	- datastore 
	*	- DatastoreClass 
	*	- EntityCollection
	* @warning : 
	* - calculated attributes are not exported -- only their underlying attributes are exported,
	* - extended datastore classes are not exported,
	* - related or alias attributes are not exported directly -- only primary keys values are exported,
	* - data from outside catalogs or datastores are not exported	
	* #### Example 
	* ```javascript
	* 	myFolder = new Folder("C:/ExportCollection/");     // get a reference to the export folder
	*	if (myFolder.exists)     // if the folder actually exists
	*	{
    *	var coll=ds.Employee.query("lastName = :1", "P*");   
    *	coll.exportAsSQL( myFolder ) ;     // export the collection
	* ```
	* For more details go here : http://doc.wakanda.org/home2.en.html%23/Datastore/Entity-Collection/length.303-638616.en.html#/Datastore/Entity-Collection/exportAsSQL.301-1041494.en.html
	*
	* @param exportFolder Folder Folder where you want to export the collection.
	* @param numFiles Number Maximum number of files per Folder
	* @param fileLimitSize	Number Size limit vamue of export files (in KB)
	* @param attLimitSize Number Size limit (in bytes) velow which the contents of a BLOB or Picture attribute are embedded into the main file
	*/
	exportAsSQL(exportFolder: WAKFolderInstance, numFiles?: Number, fileLimitSize?: Number, attLimitSize?: Number) : void;
	
	
	
	
	
	
	
	
	
/**
	* Search operation in a the DatastoreClass or EntityCollection that returns `the first entity` found in an object of type `Entity`
	* ## Important :
	* ``
	* The find( ) method is equivalent to executing a query( ) followed by retrieving the first entity:
	* For more details and exemples check the Query method section
	* ``
	* #### Example1 : With QueryString syntax
	* ```javascript
	* ds.Employee.find( "name == DOE");
	* ```
	* #### Example2 :  With placeholders syntax
	* ```javascript
	* ds.Employee.find( 'name ==:1', "DOE");
	* ```
	* @param queryString 
	* @param valueList  Value(s) to compare when using placeholders
	* @param options 
	* @returns The first found entity in the collection
	* 
	*  
	*/
	find(queryString: String, valueList: any[], options : Object) : Entity;
	
	
	
	
	/**
	* Returns the entity in the first position of the entity collection or datastore class
	* #### Example
	* ```javascript
	* ds.Employee.query('ID > 2').first()  //exemple1
	* ds.Company.first()  //exemple2
	* ```
	*/
	first() : Entity;
	
	



/**
	* Executes the callbackFn function on each entity in the entity collection(or Dataclass) in ascending order
	* @param callbackFn Function Handler function to invoke for each entity in the collection
	* ``
	* The callbackFn function accepts two parameters: function (`thisArg`, `iterator`)
	* -  The first parameter, `thisArg`, represents the entity currently being processed. When it is executed, the function receives in this parameter the entity on which it iterates (the parameter is used like the keyword `this`). You can then perform any type of operation on the values of the entity.
	* - The second (optional) parameter, `iterator`, is the iterator. When it is executed, the function receives in this parameter the position of the element currently being processed in the entity collection. You can use it, for example, to display a counter.
	* ``
	* @warning The forEach( ) method includes an optimized mechanism that triggers the entity to be saved automatically if it has been modified, and not saved when it hasn't.
	* You can however call the save( ) method anyway to manage any errors in a try/catch structure.  (In this case the call is detected by Wakanda and the entity is not saved a second time)
	* #### Example 
	* ```javascript
	*  // We want to give a 5% raise to all employees with a salary less than 5,000.
	* mySet = ds.Employee.query('salary < 5000') ;
	* mySet.forEach(
    * function( emp ) {
	* emp.salary *= 1.05;
	* // unnecessary to save modification forEach does it automatically when needed
    * });
	* ```
	*/
	forEach(callbackFn: Function) : void;
	
	
	
	
	
	
	/**
	*generates entities in the datastore class where it is applied and returns the resulting entity collection
	*/
	fromArray(arrayValues: any[]) : EntityCollection;
	/**
	*returns the percentage of logical fragmentation for the entities of the datastore class
	*/
	getFragmentation() : Number;
	/**
	*returns the name of the datastore class to which it is applied in a string
	*/
	getName() : String;
	/**
	*returns the current scope property value of the datastore class
	*/
	getScope() : String;
	/**
	*imports all the entities stored in JSON format from the file(s) located in the importFolder folder
	*/
	importFromJSON(importFolder: WAKFolderInstance) : void;
	/**
	*returns the maximum value among all the values of attribute in the entity collection or datastore class
	*/
	max(attribute: DatastoreClassAttribute) : Number;
	/**
	*returns the maximum value among all the values of attribute in the entity collection or datastore class
	*/
	max(attribute: String) : Number;
	/**
	*returns the lowest (or minimum) value among all the values of attribute in the entity collection or datastore class
	*/
	min(attribute: DatastoreClassAttribute) : Number;
	/**
	*returns the lowest (or minimum) value among all the values of attribute in the entity collection or datastore class
	*/
	min(attribute: String) : Number;
	/**
	*sorts the entities in the entity collection or datastore class and returns a new sorted entity collection
	*/
	orderBy(attributeList: String, sortOrder?: String) : EntityCollection;
	/**
	*sorts the entities in the entity collection or datastore class and returns a new sorted entity collection
	*/
	orderBy(attributeList: DatastoreClassAttribute, sortOrder?: String) : EntityCollection;
	/**
	*searches all the entities in the datastore class or entity collection using the search criteria specified in queryString and returns a new collection containing the entities found
	*/
	query(queryString: String, ...valueList: any[]) : EntityCollection;
	/**
	*permanently removes entities from the datastore
	*/
	remove() : void;
	/**
	*(re)sets the start value for the autosequence number of the datastore class
	*/
	setAutoSequenceNumber(counter: Number) : void;
	/**
	*returns the sum (i.e., total of all the values) of attribute for the datastore class or entity collection
	*/
	sum(attribute: DatastoreClassAttribute, distinct?: Boolean) : Number;
	/**
	*returns the sum (i.e., total of all the values) of attribute for the datastore class or entity collection
	*/
	sum(attribute: DatastoreClassAttribute, distinct?: String) : Number;
	/**
	*returns the sum (i.e., total of all the values) of attribute for the datastore class or entity collection
	*/
	sum(attribute: String, distinct?: Boolean) : Number;
	/**
	*returns the sum (i.e., total of all the values) of attribute for the datastore class or entity collection
	*/
	sum(attribute: String, distinct?: String) : Number;
	/**
	*creates and returns a JavaScript array where each element is an object containing a set of properties and values corresponding to the attribute names and values for a datastore class or an entity collection
	*/
	toArray(attributeList: String, sortList: String, key: String, skip: Number, top?: Number) : any[];
	/**
	*creates and returns a JavaScript array where each element is an object containing a set of properties and values corresponding to the attribute names and values for a datastore class or an entity collection
	*/
	toArray(attributeList: String, sortList: String, key: Boolean, skip: Number, top?: Number) : any[];
	/**
	*creates and returns a JavaScript array where each element is an object containing a set of properties and values corresponding to the attribute names and values for a datastore class or an entity collection
	*/
	toArray(attributeList: DatastoreClassAttribute, sortList: String, key: String, skip: Number, top?: Number) : any[];
	/**
	*creates and returns a JavaScript array where each element is an object containing a set of properties and values corresponding to the attribute names and values for a datastore class or an entity collection
	*/
	toArray(attributeList: DatastoreClassAttribute, sortList: String, key: Boolean, skip: Number, top?: Number) : any[];
	/**
	*returns the name of the datastore class as a string
	*/
	toString() : String;
}

interface AttributeEnumerator{
	
}

interface AttributeEnumerator {
    [attributeName: string]: DatastoreClassAttribute;
}