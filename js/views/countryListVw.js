var __ = require('underscore'),
    Backbone = require('backbone'),
    $ = require('jquery'),
    loadTemplate = require('../utils/loadTemplate'),
    countriesModel = require('../models/countriesMd'),
    chooseCountriesCollection = require('../collections/chooseCountryCl'),
    chooseCountryView = require('../views/chooseCountryVw');

module.exports = Backbone.View.extend({

  initialize: function(options){
    this.options = options || {};
    this.countries = new countriesModel();
    this.chooseCountries = new chooseCountriesCollection(this.countries.get('countries'));
    this.subViews = [];
    this.render();
  },

  render: function(){
    var self = this;
    this.listContents = [];
    __.each(this.chooseCountries.models, function(item){
      self.renderItem(item);
    },this);
    this.$el.append('<ul class="flexRow list homeModal-settings scrollOverflowY custCol-primary custCol-text">'+ this.listContents.join('') +'</ul>');
    window.obEventBus.trigger("countryListRendered");
  },

  renderItem: function(item){
    var itemJSON = item.toJSON();
    itemJSON.selected = this.options.selected;
    this.listContents.push('<li class="flexRow custCol-border">');
    this.listContents.push('<div class="rowItem js-homeModal-countrySelect paddingLeft6" data-code="'+ itemJSON.dataName +'">');
    this.listContents.push('<input type="radio" class="fieldItem" id="country-'+ itemJSON.dataName +'" name="'+ itemJSON.dataName +'"');
    if(itemJSON.selected == itemJSON.dataName){
      this.listContents.push('checked="checked"');
    }
    this.listContents.push('>');
    this.listContents.push('<label class="homeModal-country radioLabel" for="country-'+ itemJSON.dataName +'">'+ itemJSON.name +'</label>');
    this.listContents.push('</div></li>');
  },

  close: function(){
    __.each(this.subViews, function(subView) {
      if(subView.close){
        subView.close();
      }else{
        subView.unbind();
        subView.remove();
      }
    });
    this.unbind();
    this.remove();
  }
});

