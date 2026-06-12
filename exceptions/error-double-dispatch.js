
class DatabaseError extends Error {
    accept(visitor) {
        visitor.visitDatabaseError(this)
    }
}

class ValidationError extends Error {
    accept(visitor) {
        visitor.visitValidationError(this)
    }
}

class NetworkError extends Error {
    accept(visitor) {
        visitor.visitNetworkError(this)
    }
}

class ErrorLogger {
    visitDatabaseError(error) {
        console.log("Error de base de datos:")
        console.log(error.message)
    }

    visitValidationError(error) {
        console.log("Error de validación:")
        console.log(error.message)
    }

    visitNetworkError(error) {
        console.log("Error de red:")
        console.log(error.message)
    }
}

console.log(`Sentencia previa`)
try {
    if (Math.random() > 0.5) {
        throw new ValidationError("Email inválido")
    }
    if (Math.random() > 0.5) {
        throw new NetworkError("Error de conexión")
    }
    if (Math.random() > 0.5) {
        throw new DatabaseError("Error de base de datos")
    }
    console.log("Sentencia ejecutada?")
} catch (exception) {
    exception.accept(new ErrorLogger())
}
console.log(`Sentencia posterior`)