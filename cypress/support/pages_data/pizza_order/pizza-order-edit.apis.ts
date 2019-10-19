const apis = [{
    method: 'GET',
    name: 'editEntry',
    regex: '**',
    response: 'entry/edit_tag/edit_tag_entry_response',
},
{
    method: 'POST',
    name: 'editSearch',
    regex: '**',
    response: 'entry/edit_tag/edit_tag_search_response',
}]

export { apis }
