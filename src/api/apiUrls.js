const API_URLS={
    AUTH:{
        LOGIN:'/api/auth/login',
        REGISTER:'/api/auth/register',
        FORGOT_PWD:'/api/auth/forgot-password',
        RESET_PWD:'/api/auth/reset-password',
        UPLOAD_PROFILE:'/api/auth/upload-photo'
    },
    TASK:{
        CREATE_TASK:'/api/activity/create-task',
        EDIT_TASK:'/api/activity/edit-task/', // we 'll append ID here ibn the service
        GET_TASK:'/api/activity/get-task',
        DELETE_TASK:'/api/activity/delete-task/'
    },
    NOTE:{
        CREATE_NOTE:'/api/activity/create-note',
        EDIT_NOTE:'/api/activity/edit-note/',
        GET_NOTE:'/api/activity/get-note',
        DELETE_NOTE:'/api/activity/delete-note/'
    },
    TODO:{
        CREATE_TODO:'/api/activity/create-todo',
        EDIT_TODO:'/api/activity/edit-todo/',
        GET_TODO:'/api/activity/get-todo',
        DELETE_TODO:'/api/activity/delete-todo/'
    },
}

export default API_URLS;