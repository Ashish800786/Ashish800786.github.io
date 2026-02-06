
  function menu_active(element)
  {
    $('.submenu').removeClass( "active");
    $(element).addClass( "active");
  }
  
  function skills_toggle(element)
  {
    $('.about-skills').toggle();
    $('#skills_show').toggle();
    $('#skills_hide').toggle();
  }

  function resetSubmitBtn(submitBtndata)
  {
    setTimeout(()=>{
         $('#submitHandler').html(submitBtndata);
       },3000);
  }


  $(document).ready(function(){
    $(this).scrollTop(0);
    $('#skills_hide').hide();
    $('.about-skills').hide();


    $('#contactme').submit((e)=>{
      e.preventDefault();
      const sentBtn= `<button type="button" class="btn text-success" > ✅ Sent ✅</button>`;
      const failedBtn= `<button type="button" class="btn text-danger" >❌ Failed ❌</button>`;
      const submitBtn= `<input type="submit" value="Send Message" class="btn">`;
      const loader= `<div class="spinner-border" role="status text-primary">
                    <div class="visually-hidden">Loading..</div>
                </div>`;
      $('#submitHandler').html(submitBtn);
      const name = $('#name').val();
      const email = $('#email').val();
      const message = $('#message').val();
      if(name.trim())
      {
        $('#name').removeClass('is-invalid');
        $('#name').addClass('is-valid');
      }else
      {
        $('#name').removeClass('is-valid');
        $('#name').addClass('is-invalid');
        $('#name').focus();
        return
      }
      
      if(email.trim())
      {
        $('#email').removeClass('is-invalid');
        $('#email').addClass('is-valid');
      }else
      {
        $('#email').removeClass('is-valid');
        $('#email').addClass('is-invalid');
        $('#email').focus();
        return
      }

      if(message.trim())
      {
        $('#message').removeClass('is-invalid');
        $('#message').addClass('is-valid');
      }else{
        $('#message').removeClass('is-valid');
        $('#message').addClass('is-invalid');
        $('#message').focus();
        return
      }

       $('#submitHandler').html(loader);
       
     
      try{
         fetch('https://formspree.io/f/xdalonvo',{
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name,
            email: email,
            message: message
          })
        })
          .then((res) => 
            {
              if(!res.ok)
              {
                throw new error(res.status);
              }
              res.json();
      })
          .then((data)=>{
            $('#submitHandler').html(sentBtn);
            $('#contactme')[0].reset();
          })
          .catch((err)=>{
            $('#submitHandler').html(failedBtn);
            resetSubmitBtn(submitBtn);
            console.log(err);
          })
          .finally(()=>{
            resetSubmitBtn(submitBtn);
          })
      }catch(error)
      {
        $('#submitHandler').html(failedBtn);
      }finally
      {
        resetSubmitBtn(submitBtn);
      }
    

    })
});

