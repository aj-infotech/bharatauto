$(document).ready(function () {
  var $loading = $('#overlay').hide();
  $(document)
    .ajaxStart(function () {
      $loading.show();
    })
    .ajaxStop(function () {
      $loading.hide();
    });

  var product_data = []
  var supplier_state;
  var profile_state;

  $.ajax({
    type: "GET",
    url: $('#ownerstate_gst').attr('data-href'),
    async: false,
    success: function (response) {
      profile_state = response
    },
  })

  $.ajax({
    type: "GET",
    url: $('.product_data_gst').attr('data-href'),
    async: false,
    success: function (response) {
      product_data = response
    },
  })

  $('.supplier_gst').change(function () {
    var name = $('.supplier_gst').val();
    $.ajax({
      type: "GET",
      url: $('#st').attr('data-href'),
      data: { 'sname': name },
      success: function (response) {
        supplier_state = response
      },
    })
  })
  
  console.log(profile_state);
  console.log(product_data);

  var counter = 1;
  $(document).on('focus', "tr td", function (e) {

    myString = $(this).closest('tr').attr('itemid');
    counter = myString;

    var prnt = $(this).closest('tr').attr('itemid');

    var lst = Number(prnt) + Number(1);

    $(".addbtntext" + counter).focus(function () {
      if (document.getElementById("row" + lst) != null) {

      } else {
        counter++;
        no = counter + 1

        $.ajax({
          type: "GET",
          url: $('#c').attr('data-href'),
          data: { 'c': counter },
          success: function (response) {
            console.log(response)
          },
          error: function (response) {
            alert("error c")
          }
        })

        var newRow = $(document.createElement('tr'))
          .attr("id", 'row' + counter)
          .attr("itemid", counter)
        newRow.html('<td><a id="del' + counter + '" href="#"> <i class="fa fa-trash" style="color: red;"aria-hidden="true"></i> </a></td><td><input type="number" min="0" class="form-control" id="hsn' + counter + '" name="hsn' + counter + '"></td><td><select name="prod' + counter + '" id="prod' + counter + '" placeholder="Select Product" class="product-select form-control" ><option selected>--------Select Product--------</option></select></td><td><input type="text" class="tot form-control" id="unit' + counter + '" name="unit' + counter + '" readonly ></td><td><input type="number" min="0" step="any" class="form-control" id="rate' + counter + '" name="rate' + counter + '"></td><td><input type="number" min="0" class="form-control" id="qty' + counter + '" name="qty' + counter + '"></td><td><input type="number" min="0" step="any" class="addbtntext' + counter + ' form-control" id="gstp' + counter + '" name="gstp' + counter + '"></td><td><input type="number" class="gstamt form-control" id="gstamt' + counter + '" name="gstamt' + counter + '"readonly  ></td><td><input type="text" class="tot form-control" id="tot' + counter + '" name="tot' + counter + '" readonly ></td>')
        newRow.appendTo('#itemtable')

        $('.product-select').select2();
        for (var i = 0; i < product_data.productdata.length; i++) {
          $('#prod' + counter).append('<option value="' + product_data.productdata[i].product_name + '">' + product_data.productdata[i].product_name + '</option>')
        }
      }
    });

    $('#prod' + counter).change(function () {
      var pname = $('#prod' + counter).val()
      var sname = $('#supplier_gst').val()

      $.ajax({
        type: "GET",
        url: $('.purchaseprice_gst').attr('data-href'),
        data: { 'pname': pname, 'sname': sname },
        success: function (response) {
          $('#rate' + counter).val(response)
        },
        error: function (response) {
          console.log("error data not found")
        }
      })

      for (var i = 0; i < product_data.productdata.length; i++) {
        if (product_data.productdata[i].product_name === pname) {
          $('#unit' + counter).val(product_data.productdata[i].unit)
        }
      }
    });

      var id = $(this).closest('tr').attr('itemid');
      $("#rate" + id).keyup(function () {
        var rate = $('#rate' + id).val()
        var qty = $('#qty' + id).val()
        var gstp = $('#gstp' + id).val()

        var tot = parseFloat(rate) * parseFloat(qty)
        var gstamt = tot * gstp / 100
        $('#gstamt' + id).val(gstamt)
        $('#tot' + id).val(tot)

        var sum = 0;
        $('tr').find('.tot').each(function () {
          if (!isNaN(this.value) && this.value.length != 0) {
            sum += parseFloat(this.value)
          }
        })
        $('#total').val(sum)
        if (supplier_state === profile_state) {
          var gstsum = 0;
          $('tr').find('.gstamt').each(function () {
            if (!isNaN(this.value) && this.value.length != 0) {
              gstsum = (parseFloat(this.value) + parseFloat(gstsum)).toFixed(2)
            }
          })
          var cgst = gstsum / 2
          $('#cgst').val(cgst)
          $('#sgst').val(cgst)
        }
        else {
          var gstsum = 0;
          $('tr').find('.gstamt').each(function () {
            if (!isNaN(this.value) && this.value.length != 0) {
              gstsum = (parseFloat(this.value) + parseFloat(gstsum)).toFixed(2)
            }
          })
          $('#igst').val(gstsum)
        }

        if ($('#roff').keyup(function () {
          var gsts = 0;
          $('tr').find('.gstamt').each(function () {
            if (!isNaN(this.value) && this.value.length != 0) {
              gsts += parseFloat(this.value)
            } gstaddsales
          })
          var roff = $('#roff').val()
          var total = $('#total').val()
          var gt = parseFloat(total) + gsts
          var gtot = gt - parseFloat(roff)
          $('#gtot').val(gtot)
        })) { }
        var total = $('#total').val()
        var gt = parseFloat(total) + parseFloat(gstsum)
        $('#gtot').val(gt)
      })

      $('#qty' + id).keyup(function () {
        var rate = $('#rate' + id).val()
        var qty = $('#qty' + id).val()
        var gstp = $('#gstp' + id).val()

        var tot = parseFloat(rate) * parseFloat(qty)
        var gstamt = tot * gstp / 100
        $('#gstamt' + id).val(gstamt)
        $('#tot' + id).val(tot)

        var sum = 0;
        $('tr').find('.tot').each(function () {
          if (!isNaN(this.value) && this.value.length != 0) {
            sum += parseFloat(this.value)
          }
        })
        $('#total').val(sum)
        if (supplier_state === profile_state) {
          var gstsum = 0;
          $('tr').find('.gstamt').each(function () {
            if (!isNaN(this.value) && this.value.length != 0) {
              gstsum = (parseFloat(this.value) + parseFloat(gstsum)).toFixed(2)
            }
          })
          var cgst = gstsum / 2
          $('#cgst').val(cgst)
          $('#sgst').val(cgst)
        }
        else {
          var gstsum = 0;
          $('tr').find('.gstamt').each(function () {
            if (!isNaN(this.value) && this.value.length != 0) {
              gstsum = (parseFloat(this.value) + parseFloat(gstsum)).toFixed(2)
            }
          })
          $('#igst').val(gstsum)
        }

        if ($('#roff').keyup(function () {
          var gsts = 0;
          $('tr').find('.gstamt').each(function () {
            if (!isNaN(this.value) && this.value.length != 0) {
              gsts += parseFloat(this.value)
            } gstaddsales
          })
          var roff = $('#roff').val()
          var total = $('#total').val()
          var gt = parseFloat(total) + gsts
          var gtot = gt - parseFloat(roff)
          $('#gtot').val(gtot)
        })) { }
        var total = $('#total').val()
        var gt = parseFloat(total) + parseFloat(gstsum)
        $('#gtot').val(gt)

      })

      $(".addbtntext" + id).keyup(function () {

        var rate = $('#rate' + id).val()
        var qty = $('#qty' + id).val()
        var gstp = $('#gstp' + id).val()

        var tot = parseFloat(rate) * parseFloat(qty)
        var gstamt = tot * gstp / 100
        $('#gstamt' + id).val(gstamt)
        $('#tot' + id).val(tot)

        var sum = 0;
        $('tr').find('.tot').each(function () {
          if (!isNaN(this.value) && this.value.length != 0) {
            sum += parseFloat(this.value)
          }
        })
        $('#total').val(sum)

        if (supplier_state === profile_state) {
          var gstsum = 0;
          $('tr').find('.gstamt').each(function () {
            if (!isNaN(this.value) && this.value.length != 0) {
              gstsum = (parseFloat(this.value) + parseFloat(gstsum)).toFixed(2)
            }
          })
          var cgst = gstsum / 2
          $('#cgst').val(cgst)
          $('#sgst').val(cgst)
        }
        else {
          var gstsum = 0;
          $('tr').find('.gstamt').each(function () {
            if (!isNaN(this.value) && this.value.length != 0) {
              gstsum = (parseFloat(this.value) + parseFloat(gstsum)).toFixed(2)
            }
          })
          $('#igst').val(gstsum)
        }

        if ($('#roff').keyup(function () {
          var gsts = 0;
          $('tr').find('.gstamt').each(function () {
            if (!isNaN(this.value) && this.value.length != 0) {
              gsts += parseFloat(this.value)
            } gstaddsales
          })
          var roff = $('#roff').val()
          var total = $('#total').val()
          var gt = parseFloat(total) + gsts
          var gtot = gt - parseFloat(roff)
          $('#gtot').val(gtot)
        })) { }
        var total = $('#total').val()
        var gt = parseFloat(total) + parseFloat(gstsum)
        $('#gtot').val(gt)

      })

      $('#del' + counter).click(function () {
        if ($('#row' + counter).attr('itemid') == 0) {
        }
        else {
          var sum = 0;
          $('tr').find('.tot').each(function () {
            if (!isNaN(this.value) && this.value.length != 0) {
              sum += parseFloat(this.value)
            }
          })
          // gst calculate
          if (supplier_state == profile_state) {
            var gstsum = 0;
            $('tr').find('.gstamt').each(function () {
              if (!isNaN(this.value) && this.value.length != 0) {
                gstsum += parseFloat(this.value)
              }
            })
            var cgst = gstsum / 2
            $('#cgst').val(cgst)
            $('#sgst').val(cgst)
          }
          else {
            var gstsum = 0;
            $('tr').find('.gstamt').each(function () {
              if (!isNaN(this.value) && this.value.length != 0) {
                gstsum += parseFloat(this.value)
              }
            })
            $('#igst').val(gstsum)
          }
          // end gst calculate 
  
          $('#total').val(sum)
          $('#row' + counter).remove()
          var total = $('#total').val()
          var roff = $('#roff').val()
          var gt = parseFloat(total) + parseFloat(gstsum) - parseFloat(roff)
          $('#gtot').val(gt)
        }
      })

      // $('.gstaddpurchase').submit(function () {
      //   var c = $('tbody').find('tr:last').attr('itemid')
      //   $.ajax({
      //     type: "GET",
      //     url: $('#c').attr('data-href'),
      //     data: { 'c': c },
      //     success: function (response) {
      //       console.log(response)
      //     },
      //     error: function (response) {
      //       alert("error c")
      //     }
      //   })
      // })

    });
    // $('#gstaddsales').click(function (){
    //   var json_data=[];
    //   $('#itemtable tr').each(function(){
    //   var billno=$('#bill_no').val()
    //   var hsncode=$(this).find("td:eq(2) input[type='number']").val()
    //   var product_name=$(this).find("td:eq(3) select").val()
    //   var unit=$(this).children().eq(4).text()
    //   var rate=$(this).find("td:eq(5) input[type='number']").val()
    //   var qty=$(this).find("td:eq(6) input[type='number']").val()
    //   var gstp=$(this).find("td:eq(7) input[type='number']").val()
    //   var gstamt=$(this).find("td:eq(8) input[type='number']").val()
    //   var total=$(this).find("td:eq(9) input[type='text']").val()
    //   var single_data={
    //     'billno':billno,
    //     'hsncode':hsncode,
    //     'product_name':product_name,
    //     'unit':unit,
    //     'rate':rate,
    //     'qty':qty,
    //     'gstp':gstp,
    //     'gstamt':gstamt,
    //     'total':total
    //     }
    //   json_data.push(single_data);
    //   })
    //   var string_data=JSON.stringify(json_data)
    //   alert(string_data)
    //   $.ajax({
    //     url:$('#itemtable').attr('data-href'),
    //     type:'POST',
    //     data:{data:string_data}
    //   })
    //   .done(function(response){
    //     if(response['error']==false){
    //     $('#upt_error').hide();
    //     $('#upt_success').text(response['errorMessage']);
    //     $('#upt_success').show();}
    //     else{
    //     $('#upt_success').hide();
    //     $('#upt_error').text(response['errorMessage']);
    //     $('#upt_error').show();
    //     }
    //     })
    //     .fail(function(){
    //     $('#upt_success').hide();
    //     $('#upt_error').text('Something Went Wrong!');
    //     $('#upt_error').show();
    //     })
    // })
});