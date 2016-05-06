var user_list = {
        controller:function(){
          var fetchedUsers = m.request({
              method:"GET",
              url:"/users"
          })

          return {
            users:fetchedUsers,
            schema:{
              first_name:m.prop(""),
              last_name:m.prop("")
            }
          }
        },
        view:function(ctrl,args){
          return m(".ui stackable container", [
            m("h1","Users"),
            m("br"),
            m("br"),
            // $ table to show the users
            m("table",{class:"ui celled table"},[
              m("thead",[
                // m("th","uuid"),
                m("th","First name"),
                m("th","Last name"),
                m("th","Emails"),
                m("th",[
                    m("button",{
                      class:"ui left floated  button",
                      onclick:function(){
                        $('.ui.modal').modal('show');
                      }
                    },"Add user")
                ]),
              ]),

              m("tbody",[
                ctrl.users().result.map(function(user){
                  return m("tr",[
                    // m("td",user.userid),
                    m("td",user.first_name),
                    m("td",user.last_name),
                    m("td",user.emails.map(function(email){return m("li",email)})),
                    m("td",[
                      m("button",{
                        class:"ui left floated  button",
                        onclick:function(){
                          // $('.ui.modal').modal('show');
                          m.request({
                                method:"Delete",
                                url:"/user/" + user.userid
                          }).then(m.route( m.route( ) ))
                        }
                      },"Delete"),
                      m("a",{
                        class:"ui left floated  button",
                        href:"/posts/" + user.userid,
                        config:m.route
                      },"View posts")
                    ])

                  ])
                })
              ])
            ]),

            // $ modal to show the adding ui
            m(".ui modal",[
              // m(".header","awesomness"),
              m("form",{
                class:"ui form",
                onsubmit:function(e){
                  e.preventDefault()
                  
                  m.request({
                        method:"POST",
                        url:"/users",
                        data:{
                          first_name:ctrl.schema.first_name(),
                          last_name:ctrl.schema.last_name()
                        }
                  }).then(m.route( m.route( ) )).then($('.ui.modal').modal('hide'))

                  
                }
              },[
                m(".field",[
                  m("label","First name"),
                  m("input",{
                    type:"text",
                    name:"first-name",
                    placeholder:"First Name",
                    oninput: m.withAttr("value", ctrl.schema.first_name), 
                    value: ctrl.schema.first_name()
                  })
                ]),
                 m(".field",[
                  m("label","Last name"),
                  m("input",{
                    type:"text",
                    name:"first-name",
                    placeholder:"Last Name",
                    oninput: m.withAttr("value", ctrl.schema.last_name), 
                    value:  ctrl.schema.last_name()
                  })
                ]),

                m("button",{class:"ui button",type:"submit"},"Submit")
              ])
            ])
          ])
        }
      }