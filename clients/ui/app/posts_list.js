var posts_list = {
        controller:function(){
          var fetchedposts = m.request({
              method:"GET",
              url:"/posts"
          })

          return {
            posts:fetchedposts,
            schema:{
              first_name:m.prop(""),
              last_name:m.prop("")
            }
          }
        },
        view:function(ctrl,args){
          return m(".ui stackable container", [
            m("h1","Posts"),
            m("br"),
            m("br"),
            // $ table to show the posts
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
                    },"Add Post"),

                     m("button",{
                      class:"ui left floated  button",
                      onclick:function(){
                        // $('.ui.modal').modal('show');
                        window.history.back()
                      }
                    },"Back")
                ]),
              ]),

              m("tbody",[
                ctrl.posts().result.map(function(post){
                  return m("tr",[
                    // m("td",post.postid),
                    m("td",post.first_name),
                    m("td",post.last_name),
                    m("td",post.emails.map(function(email){return m("li",email)})),
                    m("td",[
                      m("button",{
                        class:"ui left floated  button",
                        onclick:function(){
                          // $('.ui.modal').modal('show');
                          m.request({
                                method:"Delete",
                                url:"/post/" + post.postid
                          }).then(m.route( m.route( ) ))
                        }
                      },"Delete")
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
                        url:"/posts",
                        data:{
                          first_name:ctrl.schema.first_name(),
                          last_name:ctrl.schema.last_name()
                        }
                  }).then(m.route( m.route( ) )).then($('.ui.modal').modal('hide'))

                  
                }
              },[
                m(".field",[
                  m("label","Title"),
                  m("input",{
                    type:"text",
                    name:"first-name",
                    placeholder:"First Name",
                    oninput: m.withAttr("value", ctrl.schema.first_name), 
                    value: ctrl.schema.first_name()
                  })
                ]),
                 m(".field",[
                  m("label","Content"),
                  m("textarea",{
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