clickCounter = 0;

$('.signInLocalButton').on 'mousedown', (e) ->
  form = $(e.currentTarget.nextElementSibling)
  name = e.currentTarget.nextElementSibling.classList
  if name.length == 2 #Form is open
    if (clickCounter == 0) #Login Form
      Buttontext = $('button').contents().last()[0].textContent #Replace text inside of Button
      $('button').contents().last()[0].textContent = Buttontext.replace("Sign In", "Sign Up")
      SubmitText = $('input[type="submit"]')[0].value#Replace text inside of submit Button
      $('input[type="submit"]')[0].value = SubmitText.replace('Log In', 'Sign Up')
      form.find('p').prepend('<label class="zipInput">Zip</label><input type="text" class="zipInput" name="zipInput">') #Add the email Field for signup
      form.find('p').prepend('<label class="emailInput">Username </label><input type="text" class="emailInput" name="username">') #Add the email Field for signup
      $('.userInfoForm').attr('action', '/register') #Change endpoint hit on submit
      clickCounter = 1


    else #Sign in Form
      $('.emailInput').remove()
      $('.zipInput').remove()
      text = $('button').contents().last()[0].textContent #Replace text inside of Button
      $('button').contents().last()[0].textContent = text.replace("Sign Up", "Sign In")
      SubmitText = $('input[type="submit"]')[0].value#Replace text inside of submit Button
      $('input[type="submit"]')[0].value = SubmitText.replace('Sign Up', 'Log In')
      $('.userInfoForm').attr('action', '/login') #Change endpoint hit on submit
      clickCounter = 0

  else
    form.addClass('show')


