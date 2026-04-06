module.exports={
ABtesting:{
     abtesting:'#content > ul > li:nth-child(1) > a',
     heading: 'h3',
     para: 'p',
    } ,
    AddRemove:{
        url:'#content > ul > li:nth-child(2) > a',
        AddRemove:'#content > ul > li:nth-child(2) > a',
        Addbtn:'#content > div > button',
        Delete1:'#elements > button:nth-child(4)',
        Delete2:'#elements > button:nth-child(3)',
        Delete3:'#elements > button:nth-child(2)',
        Delete4:'#elements > button:nth-child(1)',      
    },
    Auth:{
        auth:':nth-child(3) > a',
    },
    Dropdown:{
        option:'#dropdown'
    },
    DynamicControls:{
        Heading:'.example > :nth-child(1)',
        Removebtn: '#checkbox-example > button',
        Addbtn: '#checkbox-example > button',
        Enablebtn: '#input-example > button',
        Disablebtn: '#input-example > button',
        Checkboxinpt: '#checkbox > input',
        Loading: '#loading',
        Messgae: '#message',
        Loadingimg: '#loading > img',
        Textfield: '#input-example > input',
    },
    Filedownloader: {
        Downloadfile1: '#content > div > a:nth-child(2)',
        Downloadfile2: '#content > div > a:nth-child(4)',
        heading: 'h3',
    },
    Fileupload: {
        File_upload: '#file-upload',
        File_submit: '#file-submit',
    }
};
