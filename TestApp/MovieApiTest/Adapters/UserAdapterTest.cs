using MovieApi.adapters;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace MovieApiTest.Adapters
{
    public class UserAdapterTest
    {
        UserAdapter _adapter;

        private void MockAdapter()
        {
            _adapter = new UserAdapter();
        }

        [SetUp]
        public void Setup()
        {
            MockAdapter();
        }

        [Test]
        public async Task ToRequestTokenResponseWithoutContentThrowException()
        {
            HttpResponseMessage ToRequestTokenResponseRequest = new HttpResponseMessage()
            {
                StatusCode = HttpStatusCode.OK,
                Content = new StringContent("4")
            };
            MockAdapter();
            Assert.ThrowsAsync<JsonException>(() => _adapter.ToRequestTokenResponse(ToRequestTokenResponseRequest));
        }
        [Test]
        public async Task ToRequestTokenResponseWithContentReturnData()
        {
            HttpResponseMessage ToRequestTokenResponseRequest = new HttpResponseMessage()
            {
                StatusCode = HttpStatusCode.OK,
                Content = new StringContent("{}")
            };
            MockAdapter();
            var actual = await _adapter.ToRequestTokenResponse(ToRequestTokenResponseRequest);
            Assert.IsFalse(actual.Success);

        }

        [Test]
        public async Task ToLoginResponseWithoutContentThrowException()
        {
            HttpResponseMessage ToRequestTokenResponseRequest = new HttpResponseMessage()
            {
                StatusCode = HttpStatusCode.OK,
                Content = new StringContent("4")
            };
            MockAdapter();
            Assert.ThrowsAsync<JsonException>(() => _adapter.ToLoginResponse(ToRequestTokenResponseRequest));

        }

        [Test]
        public async Task ToLoginResponseWithContentReturnData()
        {
            HttpResponseMessage ToRequestTokenResponseRequest = new HttpResponseMessage()
            {
                StatusCode = HttpStatusCode.OK,
                Content = new StringContent("{}")
            };
            MockAdapter();
            var actual = await _adapter.ToLoginResponse(ToRequestTokenResponseRequest);
            Assert.IsFalse(actual.Content.IsValid);
        }

        [Test]
        public async Task ToLoginErrorResponse()
        {
            MockAdapter();
            var actual = _adapter.ToLoginErrorResponse();
            Assert.IsFalse(actual.Content.IsValid);
            Assert.IsEmpty(actual.Content.AccessToken);
            Assert.AreEqual("Login", actual.ResponseSchema.ResponseMethod);
            
        }
    }
}
