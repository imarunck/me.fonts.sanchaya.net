var page = 1

var timer

$(document).ready(function(){

    ajaxToJson('')

    $('input.form-control').keyup(function(){
        page = 1
        $('div.container.showPage').html('').fadeIn()
        let val = $(this).val()
        ajaxToJson(val)
    })
    
})


$(window).scroll(function() {
    if($(window).scrollTop() == $(document).height() - $(window).height()) {
           const search = $('input.form-control').val()
           ajaxToJson(search)
    }
});

var ajaxToJson = (val) =>{
    $.ajax({  
        url:'/getFonts',  
        method:'get',  
        dataType:'json',  
        data:{'val':val, 'page': page},  
        success:function(response){  
            appendCard(response)
        },  
        error:function(response){  
            displayError()  
        }  
    }); 
}

var displayError = () =>{
    $('div.container.showPage').html("<h2 style='text-align:center;'> An error occured</h2>")
    $('input.form-control').val("")
}

var changeTextNFont = () => {
    const text = $('#type-text').val()
    const fontSize = $('#myRange').val()
    $('.custom-card-cnt p').text(text)
    $('.custom-card-cnt p').css({fontSize: fontSize + "px"})
}

var appendCard = (res) => {
    let appender = ''
    $('#loading-gif').remove()
    for(let i=0;i<res.data.length;i++){
        appender += "<div class='custom-card'><div class='hover-show'><a href='/family/"+res.data[i].link+"'>"+res.data[i].family+"</a></div><div class='custom-card-cnt'><h4><b>"+res.data[i].family+"</b></h4><hr><p style='font-family:"+res.data[i].font+",recursive;'>ಕನ್ನಡ ಒಂದು ಸುಂದರ ಭಾಷೆ. ನೀವು ಭಾಷೆಯ ಫಾಂಟ್ ಅನ್ನು ಬದಲಾಯಿಸಬಹುದು</p><hr><a role='button' class='btn btn-primary' href='/family/"+res.data[i].link+"'>Go</a></div></div>"
    }
    if(!res.isLastPage)
        appender += "<div id='loading-gif'><img src='/img/loading.gif'/></div>"
    $('div.container.showPage').append(appender)
    changeTextNFont()
    page += 1
}