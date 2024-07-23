//! Taken from <https://github.com/madonoharu/tsify/issues/24#issuecomment-1670228789>.

use syn::{DeriveInput, parse};
use proc_macro::TokenStream;
use quote::quote;

#[proc_macro_derive(TsifyAsync)]
pub fn tsify_async_macro_derive(input: TokenStream) -> TokenStream {
    // Construct a representation of Rust code as a syntax tree
    // that we can manipulate
    let ast = parse(input).unwrap();

    // Build the trait implementation
    impl_tsify_async_macro(&ast)
}

fn impl_tsify_async_macro(ast: &DeriveInput) -> TokenStream {
  let name = &ast.ident;
  let gen = quote! {
    impl From<#name> for JsValue {
      fn from(value: #name) -> Self {
        serde_wasm_bindgen::to_value(&value).unwrap()
      }
    }
  };

  gen.into()
}