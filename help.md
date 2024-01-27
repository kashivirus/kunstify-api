docker exec -it <container_id_or_name> bash


# Meta password
kashifwakhani691@gmail.com
Meta@password.com


 
The use of this, const, and static in JavaScript classes serves different purposes, and understanding their differences is important for designing and structuring your code effectively.

this:

this refers to the current instance of the class. It is used to access or modify instance-specific properties and methods.
Instance methods often use this to refer to the current instance's properties and methods.
It is not used inside static methods, as static methods are not tied to a specific instance.
const:

const is a keyword used to declare constants (variables that cannot be reassigned).
In the context of class properties, const is used to declare constant values for specific instances.
When used within a method, const is used to declare local constants that are specific to that method's scope.
static:

static is a keyword that defines a static method or property for a class. Static methods are associated with the class itself rather than instances of the class.
Static methods cannot access instance-specific data using this because they are not tied to a specific instance. They operate on the class level.
Static methods are called on the class itself, not on an instance of the class.
Here's a summary:

this is used for instance-specific properties and methods.
const is used for declaring constants within methods or for defining constant values specific to instances.
static is used for methods or properties that are associated with the class itself, not with instances.
In the context of classes, it's common to use this for instance methods, const for constants within methods or class instances, and static for methods or properties associated with the class itself. The choice depends on the specific requirements and design of your application.






    when  updated


"a": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 26,
        "info": "",
        "serverStatus": 2,
        "warningStatus": 0,
        "changedRows": 0
    }

    when select query is doe 

    const [rows , field]  = await creators.dosomeQuery()