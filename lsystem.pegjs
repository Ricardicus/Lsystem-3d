{
  function makeInteger(o) {
    return parseInt(o.join(""), 10);
  }
}

lsystems
    = first:lsystem _ rest:("," _ lsystem)* {
	return [first].concat(rest.map(function(v){ if ( v ) {return v[2];} }));
    }

lsystem
    = axiom:AxiomToken _ "(" _ state:states _ ")" _ "->" _ rules:symbols _ {
	return { "type" : "lsystem", "state" : state, "rules" : rules, axiom : axiom };
    } /
    axiom:AxiomToken _ "(" _ ")" _ "->" _ rules:symbols _ {
	return { "type" : "lsystem", "state" : {}, "rules" : rules, axiom : axiom };
    } /
    string:symbols _ {
	return { "type" : "lstring", "value" : string };
    }

states
    = first:state _ rest:("," _ state)* {
	return [first].concat(rest.map(function(v){ if ( v ) {return v[2];} }));
    }

state
    = id:identifier _ "=" _ value:expression {
	return { "id" : id.value, "value" : value };
    }

symbols
    = first:symbol _ rest:(symbol)* {
	return [first].concat(rest.map(function(v){ return v; }));
    }

symbol
    = _ RotateToken "(" _ args:arguments _ ")" {
	return { "type" : "rotate", "arguments" : args };
    } /
      _ MoveToken "(" _ args:arguments _ ")" {
	return { "type" : "move", "arguments" : args };
    } /
      _ PenUpToken "(" _ args:arguments _ ")" {
	return { "type" : "penUp", "arguments" : args };
    } /
      _ PenDownToken "(" _ args:arguments _ ")" {
	return { "type" : "penDown", "arguments" : args };
    } /
     _ axiom:AxiomToken "(" _ state:states _ ")" {
	return { "type" : "axiom", "state" : state, "axiom" : axiom };
    } /
     _ axiom:AxiomToken "(" _ ")" {
	return { "type" : "axiom", "state" : {}, "axiom" : axiom };
    } /     _ StackPushToken {
	return { "type" : "push" };
    } /
      _ StackPopToken {
	return { "type" : "pop" };  
    }

arguments
    = first:argument _ rest:("," _ argument)* {
	return [first].concat(rest.map(function(v){ if ( v ) {return v[2];} }));
    }

argument
    = expression

expression
    = left:multiplicative _ "+" _ right:expression {
	return { "type" : "add" , "left": left, "right" : right };
    }
    / left:multiplicative _ "-" _ right:expression {
	return { "type" : "sub" , "left": left, "right" : right };
    } 
    / multiplicative

multiplicative
    = left:primary _ "*" _ right:multiplicative {
	return { "type" : "mul", "left" : left, "right" : right };
    }
    / left:primary _ "/" _ right:multiplicative {
	return { "type" : "div", "left" : left, "right" : right };
    }
    / primary

primary
  = float
  / functionCall
  / integer
  / id:identifier {
    return id;  
  }
  / "(" _ expr:expression _ ")" {
    return {
	"type" : "paranthesis" , "value" : expr};
    }

functionCall
  = id:identifier _ "(" args:arguments ")" {
    return {
        "type" : "function",
        "id" : id.value,
        "args" : args
    };
  }

identifier
    = id:[a-zA-Z]+ {
	    return {
	        "type" : "id", "value" : id.join("")
	    };
    }

float
    = left:[0-9]+ "." right:[0-9]+ { return parseFloat(left.join("") + "." +   right.join("")); }
   / "-" left:[0-9]+ "." right:[0-9]+ { return -1*parseFloat(left.join("") + "." +   right.join("")); }

integer 
  = digits:[0-9]+ {
    return { "type" : "int", "value" : makeInteger(digits) };
  } /
    "-" int:integer {
    int.value *= -1;
    return int;
  }

// optional whitespace
_  = [ \t\r\n]*

RotateToken     = "rot" 
MoveToken       = "mov"
PenUpToken      = "penUp"
PenDownToken    = "penDown"
StackPushToken  = "["
StackPopToken   = "]"
AxiomToken      = [ABCDEFGH]
