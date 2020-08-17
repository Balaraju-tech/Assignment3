$(document).ready(function(){

    var searchmoviename;
    $("#searchmov").on("click",function(){

     searchmoviename = $("#searchbyuniquemovie").val();
       console.log("The movie name is");
       console.log(searchmoviename)

       
    $.get({
        url:"/searchbymovie",
        type:"get",
        data:{
            searchbyname: searchmoviename
        },
        success: function(response){
            console.log("response is ");
            console.log(response);
            if(response==""){
                $("#tablebody").html("No Data Available for the search");
            }
            else{
                console.log("The response from server is ");
            var sentmoviename = "<td>"+response.name+"</td>";
            var sentgenrename = "<td>"+response.genre+"</td>";
            var sentratingname = "<td>"+response.rating+"</td>";
            var sentlanguagename = "<td>"+response.language+"</td>";
    
            $("#tablebody").html("<tr>"+sentmoviename+sentgenrename+sentratingname+sentlanguagename+"</tr>");

            console.log(sentmoviename);
            }
        },
        error: function(err){
            console.log(err);
        }
        
    })
    })


    var change;
    $(".dropdown-toggle").on("click",function(){
        change = this.id;
    });

    $(".dropdown-item").on("click",function(){
        id= this.id;
        $(".dropdown-item").attr("class","dropdown-item disabled");
        $("#"+id).attr("class","dropdown-item");
        value = $("#"+id).html();
        
        console.log("value is ");
        console.log(value);
        console.log("change id is ");
        console.log(change);
        $("#"+change).html(value);
        console.log("mymovie name is");
        parentele = $('#'+id).closest("tr")[0].id;
        mymoviename = parentele.substring(0,parentele.length-2)
       
        console.log(mymoviename);


        $.post('/getallmovies/achievements', { myvalue : value, myvaluename: mymoviename}, 
             function(returnedData){
                 console.log("jquery ajax call is");
                console.log(returnedData);
                });
        

    });
});