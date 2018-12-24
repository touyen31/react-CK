const vstruct = require('varstruct');
const base32 = require('base32.js');
const { Keypair } = require('stellar-base');

const Transaction = vstruct([
    { name: 'version', type: vstruct.UInt8 },
    { name: 'account', type: vstruct.Buffer(35) },
    { name: 'sequence', type: vstruct.UInt64BE },
    { name: 'memo', type: vstruct.VarBuffer(vstruct.UInt8) },
    { name: 'operation', type: vstruct.UInt8 },
    { name: 'params', type: vstruct.VarBuffer(vstruct.UInt16BE) },
    { name: 'signature', type: vstruct.Buffer(64) },
]);

const CreateAccountParams = vstruct([
    { name: 'address', type: vstruct.Buffer(35) },
]);

const PaymentParams = vstruct([
    { name: 'address', type: vstruct.Buffer(35) },
    { name: 'amount', type: vstruct.UInt64BE },
]);

const EncryptionKey = vstruct([
    // 24 bytes as nonce for box, 16 first bytes is IV
    { name: 'nonce', type: vstruct.Buffer(24) },
    // 42 bytes of key + 10 bytes after box
    { name: 'box', type: vstruct.Buffer(42) },
]);

const PlainTextContent = vstruct([
    { name: 'type', type: vstruct.UInt8 },
    { name: 'text', type: vstruct.VarString(vstruct.UInt16BE) },
]);

const PostParams = vstruct([
    // Maximum length 65536 in bytes
    { name: 'content', type: vstruct.VarBuffer(vstruct.UInt16BE) },
    // Private share no more than 256 - 1 (me) people
    // Key size = 0 => no encrypt
    // Key size = 1 => only me
    { name: 'keys', type: vstruct.VarArray(vstruct.UInt8, EncryptionKey) }
]);

const UpdateAccountParams = vstruct([
    { name: 'key', type: vstruct.VarString(vstruct.UInt8) },
    { name: 'value', type: vstruct.VarBuffer(vstruct.UInt16BE) },
]);

const Content = vstruct([
    { name: 'type', type: vstruct.VarString(vstruct.UInt8) }
]);

const InteractParams = vstruct([
    // Post or comment (or something else?)
    { name: 'object', type: vstruct.Buffer(32) },
    // Encrypt with same post key (if any)
    // Depend on object on parent object keys. First 16 bytes of content are nonce/iv
    { name: 'content', type: vstruct.VarBuffer(vstruct.UInt16BE) },
    // React if '', like, love, haha, anrgy, sad, wow
]);

const ReactContent = vstruct([
    { name: 'type', type: vstruct.UInt8 },
    { name: 'reaction', type: vstruct.UInt8 },
]);

export function encode(tx) {
    let params, operation;
    if (tx.version !== 1) {
        throw Error('Wrong version');
    }
    switch (tx.operation) {
        case 'create_account':
            params = CreateAccountParams.encode({
                ...tx.params,
                address: base32.decode(tx.params.address),
            });
            operation = 1;
            break;

        case 'payment':
            let buffer = new Buffer(base32.decode(tx.params.address))
            params = PaymentParams.encode({
                ...tx.params,
                address: buffer,
            });
            operation = 2;
            break;

        case 'post':
            if(tx.params.content.type ===1){
                tx.params.content = PlainTextContent.encode(tx.params.content)
            }
            params = PostParams.encode(tx.params);
            operation = 3;
            break;

        case 'update_account':
            if(tx.params.key === 'name')
                tx.params.value = Buffer.from(tx.params.value, 'utf-8');
            if(tx.params.key === 'picture')
                tx.params.value = Buffer.from(tx.params.value, 'base64')
            console.log(tx.params)
            params = UpdateAccountParams.encode(tx.params);
            operation = 4;
            break;
        case 'interact':
            if(tx.params.content.type==1){
                tx.params.content = PlainTextContent.encode({type:1, text:tx.params.content.text})
            }else{
                tx.params.content = ReactContent.encode({type:2, reaction:tx.params.content.reaction})
            }
            params = InteractParams.encode({
                ...tx.params,
                object: Buffer.from(tx.params.object, 'hex'),
            });
            operation = 5;
            break;

        default:
            throw Error('Unspport operation');
    }

    return Transaction.encode({
        version: 1,
        account: base32.decode(tx.account),
        sequence: tx.sequence,
        memo: tx.memo,
        operation,
        params,
        signature: tx.signature,
    });
}

export function decode(data) {
    const tx = Transaction.decode(data);
    if (tx.version !== 1) {
        throw Error('Wrong version');
    }
    let operation, params;
    switch (tx.operation) {
        case 1:
            operation = 'create_account';
            params = CreateAccountParams.decode(tx.params);
            params.address = base32.encode(params.address);
            Keypair.fromPublicKey(params.address);
            break;

        case 2:
            operation = 'payment';
            params = PaymentParams.decode(tx.params);
            params.address = base32.encode(params.address);
            Keypair.fromPublicKey(params.address);
            break;

        case 3:
            operation = 'post';
            params = PostParams.decode(tx.params);
            params.content = PlainTextContent.encode(params.content)
            break;

        case 4:
            operation = 'update_account';
            params = UpdateAccountParams.decode(tx.params);
            if(params.key === 'name')
                params.value = params.value.toString('utf-8');
            break;

        default:
            throw Error('Unspport operation');
    }
    return {
        version: 1,
        account: base32.encode(tx.account),
        sequence: tx.sequence,
        memo: tx.memo,
        operation,
        params,
        signature: tx.signature,
    };
}

