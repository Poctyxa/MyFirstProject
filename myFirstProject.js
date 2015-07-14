MongoDB1 = new Mongo.Collection('MongoDB1');


if (Meteor.isClient) {
    Template.body.helpers ({
        elem1: [
            {
                name: "Rost",
                surname: "Dmytriv"
            }
                ,
            {
                name: "Max",
                surname: "Galybarda"
            }
            ],
        func1: function() {
            if (Session.get('hideFinished')) {
                return MongoDB1.find({checked:{$ne: true}});
            }
            else {
            return MongoDB1.find();
            }
        },
        hideFinished: function() {
            return Session.get('hideFinished');      
        }
    });
    
    Template.body.events ({
        'submit .new_element': function (event) {
            var name = event.target.el_name.value;
            var surname = event.target.el_surname.value;
            
            MongoDB1.insert({
                name : name,
                surname : surname,
                createdAt: new Date()
            });
            
            event.target.el_name.value = '';
            event.target.el_surname.value = '';
            
            return false;
        },
        'change .hide_finished': function(event) {
            Session.set('hideFinished', event.target.checked);
        }
        
      
    });
    
    Template.myList.events({
        'click .toggle_checked': function() {
            MongoDB1.update(this._id, {$set: {checked: !this.checked}});
        },
        'click .delete': function() {
            MongoDB1.remove(this._id);
        }
    });
    
    Accounts.ui.config({
        passwordSignuoFields: 'USERNAME_ONLY'
    });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
