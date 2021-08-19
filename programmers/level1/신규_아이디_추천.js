function solution(new_id) {
    new_id = new_id.toLowerCase();
    new_id = new_id.replace(/[^\w\-_\.]/g,"");
    new_id = new_id.replace(/\.{2,}/g,".");
    new_id = new_id.replace(/^\./g,"")
    new_id = new_id.replace(/\.$/g,"")
    new_id = new_id.length == 0 ? 'a' : new_id
    new_id = new_id.length >=16 ? new_id.slice(0,15) : new_id
    new_id = new_id.replace(/\.$/g,"")
    while (new_id.length <=2) {
        new_id = new_id + new_id[new_id.length-1]
    }
    return new_id
}