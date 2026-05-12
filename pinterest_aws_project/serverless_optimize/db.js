import AWS from 'aws-sdk'

AWS.config.update({
    region: "ap-southeast-1",
    accessKeyId: "",
    secretAccessKey: ""
})

const db = new AWS.DynamoDB.DocumentClient()

const Table = 'hinh_anh'


// Create or Update HinhAnhs
const createOrUpdate = async (data = {}) => {
    const params = {
        TableName: Table,
        Item: data
    }

   
       const result = await db.put(params).promise()
     return { success: result, data: result }
}

// Read all HinhAnhs
const readAllHinhAnhs = async () => {
    const params = {
        TableName: Table
    }

    try {

        console.log(Table)
        const { Items = [] } = await db.scan(params).promise()
        console.log(Items)
        return { success: true, data: Items }

    } catch (error) {
        return { success: false, data: null }
    }

}

// Read HinhAnhs by ID
const getHinhAnhById = async (value, key = 'id') => {
    const params = {
        TableName: Table,
        Key: {
            [key]: parseInt(value)
        }
    }
    console.log(Table)
    try {
        const { Item = {} } = await db.get(params).promise()
        return { success: true, data: Item }
    } catch (error) {
        return { success: false, data: null }
    }
}

// Delete HinhAnh by ID
const deleteHinhAnhById = async (value, key = 'id') => {
    const params = {
        TableName: Table,
        Key: {
            [key]: parseInt(value)
        }
    }

    try {
        await db.delete(params).promise()
        return { success: true }

    } catch (error) {
        return { success: false }
    }
}


export {
    createOrUpdate,
    readAllHinhAnhs,
    getHinhAnhById,
    deleteHinhAnhById
}